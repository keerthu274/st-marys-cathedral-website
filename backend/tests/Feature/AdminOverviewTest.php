<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\MassTime;
use App\Models\ParishRegistration;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminOverviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_overview_returns_summary_totals_and_recent_records(): void
    {
        $user = User::factory()->create();

        Event::create([
            'title' => 'Parish Supper',
            'description' => 'Community meal after Mass.',
            'start_date' => '2026-05-01',
            'start_time' => '18:00',
            'end_time' => '20:00',
            'status' => 'published',
        ]);

        MassTime::create([
            'day' => 'Sunday',
            'start_time' => '09:00',
            'location' => 'Cathedral',
            'status' => 'published',
        ]);

        ParishRegistration::create([
            'registration_type' => 'individual',
            'full_name' => 'Jane Smith',
            'date_of_birth' => '1990-01-01',
            'gender' => 'female',
            'address_line1' => '1 High Street',
            'city' => 'Wrexham',
            'postcode' => 'LL11 1AA',
            'phone' => '01978263943',
            'email' => 'jane@example.com',
            'consent_confirmed' => true,
            'signature' => 'Jane Smith',
            'signed_date' => '2026-04-01',
        ]);

        ContactMessage::create([
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'subject' => 'Question',
            'message' => 'Hello',
        ]);

        $response = $this->actingAs($user)->getJson('/admin/overview');

        $response->assertOk();
        $response->assertJsonPath('stats.events.total', 1);
        $response->assertJsonPath('stats.events.published', 1);
        $response->assertJsonPath('stats.mass_times.total', 1);
        $response->assertJsonPath('stats.registrations.total', 1);
        $response->assertJsonPath('stats.contact_messages.total', 1);
        $response->assertJsonPath('recent.events.0.title', 'Parish Supper');
        $response->assertJsonPath('recent.mass_times.0.start_time', '09:00');
        $response->assertJsonPath('recent.registrations.0.full_name', 'Jane Smith');
        $response->assertJsonPath('recent.contact_messages.0.subject', 'Question');
    }
}
