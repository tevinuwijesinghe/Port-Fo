<?php

return [
    'paths' => ['contact'],

    'allowed_methods' => ['POST', 'OPTIONS'],

    'allowed_origins' => [
        'https://tevinuwijesinghe.vercel.app/',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => [
        'Content-Type',
        'Accept',
    ],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];