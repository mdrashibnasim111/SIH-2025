"use server";

import { aiSymptomChecker } from "@/ai/flows/ai-symptom-checker";
import { z } from "zod";

const symptomSchema = z.object({
  symptoms: z.string().min(10, "Please describe your symptoms in more detail for an accurate check."),
});

type State = {
  data?: {
    possibleDiseases: string;
  };
  error?: string;
  fieldErrors?: {
    symptoms?: string[];
  }
};

export async function getDiagnosis(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = symptomSchema.safeParse({
    symptoms: formData.get("symptoms"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await aiSymptomChecker({
      symptoms: validatedFields.data.symptoms,
    });
    return { data: result };
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
