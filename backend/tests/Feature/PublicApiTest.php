<?php

namespace Tests\Feature;

use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\MassTime;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_events_endpoint_returns_only_published_events(): void
    {
        Event::create([
            'title' => 'Published Event',
            'description' => 'Visible to public.',
            'start_date' => '2026-05-01',
            'start_time' => '18:00',
            'end_time' => '20:00',
            'status' => 'published',
        ]);

        Event::create([
            'title' => 'Draft Event',
            'description' => 'Hidden from public.',
            'start_date' => '2026-05-02',
            'start_time' => '18:00',
            'end_time' => '20:00',
            'status' => 'draft',
        ]);

        $response = $this->getJson('/api/v1/events');

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.title', 'Published Event');
    }

    public function test_public_mass_times_endpoint_formats_times(): void
    {
        MassTime::create([
            'day' => 'Sunday',
            'start_time' => '09:00',
            'location' => 'Cathedral',
            'status' => 'published',
        ]);

        $response = $this->getJson('/api/v1/mass-times');

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $response->assertJsonPath('data.0.start_time', '09:00');
    }

    public function test_contact_endpoint_validates_and_stores_messages(): void
    {
        $invalidResponse = $this->postJson('/api/v1/contact', [
            'name' => '',
            'email' => 'not-an-email',
            'subject' => '',
            'message' => '',
        ]);

        $invalidResponse->assertStatus(422);
        $invalidResponse->assertJsonValidationErrors(['name', 'email', 'subject', 'message']);

        $response = $this->postJson('/api/v1/contact', [
            'name' => 'John Smith',
            'email' => 'JOHN@example.com',
            'phone' => '01978263943',
            'subject' => 'Mass enquiry',
            'message' => 'Could you tell me the weekday Mass time?',
        ]);

        $response->assertOk();
        $response->assertJsonPath('success', true);

        $this->assertDatabaseHas(ContactMessage::class, [
            'email' => 'john@example.com',
            'subject' => 'Mass enquiry',
        ]);
    }
}
