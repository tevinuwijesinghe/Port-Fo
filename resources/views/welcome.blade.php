<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Tevinu Wijesinghe — Software Engineer & Music Producer. Building scalable digital products and creating music that blends technology and creativity.">
        <meta name="keywords" content="software engineer, music producer, React, Laravel, Android, Firebase, portfolio, web developer">
        <meta property="og:title" content="Tevinu Wijesinghe — Dev & Beats">
        <meta property="og:description" content="Software Engineer & Music Producer Portfolio">
        <meta property="og:type" content="website">

        <title>Tevinu Wijesinghe — Dev &amp; Beats</title>

        <!-- Fonts: Orbitron (futuristic) + Inter (body) -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

        <!-- Vite assets -->
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        
        <!-- TikTok Embed Script -->
        <script async src="https://www.tiktok.com/embed.js"></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
