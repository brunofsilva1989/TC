<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit88611cf00eb7de175e1e8e9a60609c15
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit88611cf00eb7de175e1e8e9a60609c15::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit88611cf00eb7de175e1e8e9a60609c15::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit88611cf00eb7de175e1e8e9a60609c15::$classMap;

        }, null, ClassLoader::class);
    }
}
