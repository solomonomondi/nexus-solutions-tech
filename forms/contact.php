<?php
header('Content-Type: text/plain; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo 'Submit the contact form using POST.';
  exit;
}

function get_post_field(string $name): string
{
  $value = $_POST[$name] ?? '';
  return is_string($value) ? trim($value) : '';
}

$name = get_post_field('name');
$email = get_post_field('email');
$subject = get_post_field('subject');
$message = get_post_field('message');

if ($name === '' || strlen($name) > 120) {
  http_response_code(400);
  echo 'Enter your name (up to 120 characters).';
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
  http_response_code(400);
  echo 'Enter a valid email address.';
  exit;
}

if ($subject === '' || strlen($subject) > 200) {
  http_response_code(400);
  echo 'Enter a subject (up to 200 characters).';
  exit;
}

if ($message === '' || strlen($message) > 10000) {
  http_response_code(400);
  echo 'Enter a message of up to 10,000 characters.';
  exit;
}

$recipient = 'princesolomonn21@gmail.com';
$mailSubject = 'NexasSolutions Tech website contact form';
$mailBody = "Name: {$name}\nEmail: {$email}\nSubject: {$subject}\n\nMessage:\n{$message}";
$headers = "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (!function_exists('mail')) {
  http_response_code(500);
  echo 'Email sending is not available on this server. Please email us directly.';
  exit;
}

if (!mail($recipient, $mailSubject, $mailBody, $headers)) {
  http_response_code(500);
  echo 'The server could not accept the message for delivery. Please email us directly.';
  exit;
}

echo 'OK';
