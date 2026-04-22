<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\MassTimeController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\OverviewController;
use App\Http\Controllers\Admin\ParishRegistrationController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\Auth\ApiAuthController;
use App\Http\Controllers\NewsletterFileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return redirect()->away(rtrim(config('app.frontend_url'), '/').'/dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {

    Route::get('overview', [OverviewController::class, 'index'])
        ->name('overview');

    Route::get('events/by-date', [EventController::class, 'byDate'])
        ->name('events.by-date');

    Route::resource('events', EventController::class);

    Route::resource('mass-times', MassTimeController::class)
        ->except(['show']);

    Route::get('mass-times/by-day', [MassTimeController::class, 'byDay'])
        ->name('mass-times.by-day');

    Route::post('newsletters/{newsletter}', [NewsletterController::class, 'update'])
        ->name('newsletters.update-post');

    Route::resource('newsletters', NewsletterController::class)
        ->except(['create', 'show', 'update']);

    Route::get('parish-registrations', [ParishRegistrationController::class, 'index'])
        ->name('parish-registrations.index');

    Route::get('parish-registrations/{parishRegistration}', [ParishRegistrationController::class, 'show'])
        ->name('parish-registrations.show');

        // added: delete registration
    Route::delete('/parish-registrations/{parishRegistration}', [\App\Http\Controllers\Admin\ParishRegistrationController::class, 'destroy'])
       ->name('parish-registrations.destroy');

       // added: edit form
    Route::get('/parish-registrations/{parishRegistration}/edit',
        [\App\Http\Controllers\Admin\ParishRegistrationController::class, 'edit'])
        ->name('parish-registrations.edit');

      // added: update
    Route::put('/parish-registrations/{parishRegistration}',
        [\App\Http\Controllers\Admin\ParishRegistrationController::class, 'update'])
        ->name('parish-registrations.update');

    Route::get('contact-messages', [ContactMessageController::class, 'index'])
        ->name('contact-messages.index');

    Route::get('contact-messages/{contactMessage}', [ContactMessageController::class, 'show'])
        ->name('contact-messages.show');
});

Route::get('newsletters/{newsletter}/view', [NewsletterFileController::class, 'view'])
    ->name('newsletters.view');

Route::get('newsletters/{newsletter}/download', [NewsletterFileController::class, 'download'])
    ->name('newsletters.download');

Route::prefix('auth-api')->group(function () {
    Route::get('csrf-token', [ApiAuthController::class, 'csrfToken']);
    Route::post('signup', [ApiAuthController::class, 'signup']);
    Route::post('login', [ApiAuthController::class, 'login']);

    Route::middleware('auth')->group(function () {
        Route::get('me', [ApiAuthController::class, 'me']);
        Route::post('logout', [ApiAuthController::class, 'logout']);
    });
});

require __DIR__.'/auth.php';
