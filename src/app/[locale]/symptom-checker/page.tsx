"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getDiagnosis } from "@/app/symptom-checker/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Sparkles, Loader2, Mic } from "lucide-react";
import { useEffect, useRef } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Checking...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Check Symptoms
        </>
      )}
    </Button>
  );
}

export default function SymptomCheckerPage() {
  const initialState = {};
  const [state, formAction] = useFormState(getDiagnosis, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.data || state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Symptom Checker</h1>
        <p className="text-muted-foreground">
          Describe your symptoms to get a list of potential conditions.
        </p>
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          This tool provides information for educational purposes only and is not a substitute for professional medical advice.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Describe Your Symptoms</CardTitle>
          <CardDescription>
            Be as detailed as possible. Include when the symptoms started, their severity, and anything that makes them better or worse.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <Textarea
              name="symptoms"
              placeholder="e.g., I have a throbbing headache on one side of my head, sensitivity to light, and have been feeling nauseous for the past 2 days..."
              rows={6}
              required
            />
            {state?.fieldErrors?.symptoms && (
                <p className="text-sm font-medium text-destructive">{state.fieldErrors.symptoms}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <SubmitButton />
               <Button variant="outline" className="w-full sm:w-auto">
                <Mic className="mr-2 h-4 w-4" />
                Speak Symptoms
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {state.error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.data && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Potential Conditions
            </CardTitle>
            <CardDescription>
              Based on the symptoms you provided, here are some possibilities. Please consult a doctor for an accurate diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{state.data.possibleDiseases}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
