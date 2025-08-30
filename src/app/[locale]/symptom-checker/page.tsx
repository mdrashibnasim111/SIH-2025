
"use client";

import { useActionState, useFormStatus } from "react-dom";
import { getDiagnosis, getDiagnosisAudio } from "@/app/symptom-checker/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Sparkles, Loader2, Mic, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const [state, formAction] = useActionState(getDiagnosis, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const [audioState, setAudioState] = useState<{data?: {media: string}, error?: string, fieldErrors?: any}>({});
  const audioRef = useRef<HTMLAudioElement>(null);


  // Handle playing audio response
  useEffect(() => {
    if (state.data?.possibleDiseases) {
      getDiagnosisAudio({symptoms: state.data.possibleDiseases}).then(res => {
        setAudioState(res);
      });
    }
  }, [state.data]);

  useEffect(() => {
    if (audioState.data?.media) {
        if(audioRef.current) {
            audioRef.current.src = audioState.data.media;
            audioRef.current.play();
        }
    }
  }, [audioState.data]);


  // Initialize speech recognition
  useEffect(() => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: "destructive",
        title: "Browser not supported",
        description: "Speech recognition is not supported in your browser.",
      });
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let finalTranscript = textareaRef.current?.value || '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
           finalTranscript += event.results[i][0].transcript;
        }
      }
      if (textareaRef.current) {
        textareaRef.current.value = finalTranscript;
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      toast({
        variant: "destructive",
        title: "Speech Recognition Error",
        description: `An error occurred: ${event.error}`,
      });
      setIsRecording(false);
    };

  }, [toast]);

  const handleMicClick = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      if (textareaRef.current) {
        textareaRef.current.value = '';
      }
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };


  useEffect(() => {
    if (state.data || state.error) {
      // Don't reset the form to keep showing the result.
      // formRef.current?.reset();
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
            Be as detailed as possible. You can type or use the microphone to speak.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-4">
            <Textarea
              ref={textareaRef}
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
               <Button variant={isRecording ? "destructive" : "outline"} className="w-full sm:w-auto" onClick={handleMicClick} type="button">
                <Mic className="mr-2 h-4 w-4" />
                {isRecording ? "Stop Listening" : "Speak Symptoms"}
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
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Potential Conditions
              </div>
               {audioState.data?.media && (
                <audio ref={audioRef} controls />
              )}
               {audioState.error && (
                 <Alert variant="destructive" className="w-fit p-2">
                   <AlertDescription>{audioState.error}</AlertDescription>
                 </Alert>
               )}
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
