<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Trip;

// app/Notifications/TripAssignedNotification.php

class TripAssignedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Trip $trip) {}

    public function via($notifiable)
    {
        return ['database'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'You have a new trip assigned.',
            'trip_id' => $this->trip->id,
        ];
    }
}

