import { z } from 'zod';

// Define the schema
const contactSchema = z.object({
  firstName: z.string().min(2, "First name is too short").max(50),
  lastName: z.string().min(2, "Last name is too short").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
  // The Honeypot field
  hp_field: z.string().max(0, "Bot detected") 
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  // 1. Zod & Honeypot Validation
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    // If it's a bot (hp_field wasn't empty), we pretend it was successful 
    // so the bot thinks it won, but we don't actually process it.
    if (result.error.issues.some(i => i.path.includes('hp_field'))) {
      return { success: true, message: 'Message sent! (Shadow blocked)' };
    }

    throw createError({
      statusCode: 400,
      statusMessage: result.error.errors[0].message,
    });
  }

  // 2. Forward to Google Apps Script
  try {
    const { hp_field, ...validData } = result.data; // Remove honeypot before sending

    await $fetch(config.googleScriptUrl, {
      method: 'POST',
      body: {
        ...validData,
        secret: config.googleScriptSecret
      },
      timeout: 10000
    });

    return { success: true, message: 'Message sent successfully!' };

  } catch (error) {
    console.error('Google API Error:', error);
    throw createError({
      statusCode: 502,
      statusMessage: 'Service temporarily unavailable.',
    });
  }
});