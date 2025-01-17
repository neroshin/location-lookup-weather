<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2ba99ec72987f81c84d27062582ab025
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'Webdev\\Slider\\' => 14,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Webdev\\Slider\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2ba99ec72987f81c84d27062582ab025::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2ba99ec72987f81c84d27062582ab025::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2ba99ec72987f81c84d27062582ab025::$classMap;

        }, null, ClassLoader::class);
    }
}
