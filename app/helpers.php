<?php
function storeImage($image, $path): bool|string
{
    $path = '/uploads' . $path;
    try {
        $name = time() . '.' . $image->getClientOriginalExtension();
        $destinationPath = public_path($path);
        $image->move($destinationPath, $name);
        if (isset($name)) {
            return $path . $name;
        }
        return false;
    } catch (\Exception $e) {
        return false;
    }
}


function writeLog($string, $file = "logs.txt"): void
{
    file_put_contents(
        storage_path() . "/logs/" . $file,
        $string . PHP_EOL,
        FILE_APPEND | LOCK_EX
     );
}
