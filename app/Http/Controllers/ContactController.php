<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactController extends Controller
{
    public function send(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        try {
            $emailBody = implode("\n", [
                "Name: {$validated['name']}",
                "Email: {$validated['email']}",
                '',
                'Message:',
                $validated['message'],
            ]);

            Mail::raw($emailBody, function ($mail) use ($validated) {
                $mail->to(
                    config('mail.contact_to.address'),
                    config('mail.contact_to.name')
                )
                ->subject('New contact message from portfolio')
                ->replyTo(
                    $validated['email'],
                    $validated['name']
                );
            });

            return response()->json([
                'message' => 'Message sent successfully.',
            ]);
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'The message could not be sent. Please try again.',
            ], 500);
        }
    }
}