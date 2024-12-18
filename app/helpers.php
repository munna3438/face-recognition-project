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

function deleteImage($imagePath): void
{
    if (file_exists($imagePath)) {
        unlink($imagePath);
    }
}


function getErrorMsgFromCode($code)
{
    $errors = [
        "-101" => "Document name ID number duplicate",
        "-102" => "Library is full",
        "-103" => "Add a timeout",
        "-104" => "Parameter error",
        "-105" => "The file is too large",
        "-106" => "Insufficient storage space",
        "-107" => "File opening failed",
        "-108" => "No database",
        "-109" => "Picture reading failure",
        "-110" => "Corrupt database files",
        "-111" => "Poor image quality",
        "-112" => "Image size is wrong, width and height cannot be odd",
        "-113" => "Failure to detect face (no face detectedormultiple faces detected)",
        "-114" => "Picture is in the wrong format",
        "-115" => "Face area error",
        "-116" => "Algorithm created handle error",
        "-117" => "Device is busy",
        "-118" => "File write failure",
        "-119" => "Delete failed (corresponding IDdeletionnotfound)",
        "-120" => "Memory allocation failed",
        "-121" => "NULL",
        "-122" => "Effective time error",
        "-123" => "Feature value write failed'",
        "-124" => "AI library not initialized complete",

        "201" => "Parameter does not exist",
        "202" => "User id already exists",
        "203" => "User id does not exist",
        "204" => "Device is busy",
        "205" => "Illegal argument",
        "206" => "Administrator password error",
        "207" => "Command does not exist",
        "208" => "No new news",
        "209" => "Device does not support",
        "210" => "File format not supported",

        // 1-101 CURL Errors
        "1" => "The URL you passed to libcurl used a protocol that this libcurl does not support. The support might be a compile-time option that you did not use, it can be a misspelled protocol string or just a protocol libcurl has no code for.",
        "2" => "Early initialization code failed. This is likely to be an internal error or problem, or a resource problem where something fundamental could not get done at init time.",
        "3" => "The URL was not properly formatted.",
        "4" => "A requested feature, protocol or option was not found built into this libcurl due to a build-time decision. This means that a feature or option was not enabled or explicitly disabled when libcurl was built and in order to get it to function you have to get a rebuilt libcurl.",
        "5" => "Could not resolve proxy. The given proxy host could not be resolved.",
        "6" => "Could not resolve host. The given remote host was not resolved.",
        "7" => "Failed to connect() to host or proxy.",
        "8" => "The server sent data libcurl could not parse. This error code was known as CURLE_FTP_WEIRD_SERVER_REPLY before 7.51.0.",
        "9" => "We were denied access to the resource given in the URL. For FTP, this occurs while trying to change to the remote directory.",
        "10" => "While waiting for the server to connect back when an active FTP session is used, an error code was sent over the control connection or similar.",
        "11" => "After having sent the FTP password to the server, libcurl expects a proper reply. This error code indicates that an unexpected code was returned.",
        "12" => "During an active FTP session while waiting for the server to connect, the CURLOPT_ACCEPTTIMEOUT_MS (or the internal default) timeout expired.",
        "13" => "libcurl failed to get a sensible result back from the server as a response to either a PASV or a EPSV command. The server is flawed.",
        "14" => "FTP servers return a 227-line as a response to a PASV command. If libcurl fails to parse that line, this return code is passed back.",
        "15" => "An internal failure to lookup the host used for the new connection.",
        "16" => "A problem was detected in the HTTP2 framing layer. This is somewhat generic and can be one out of several problems, see the error buffer for details.",
        "17" => "Received an error when trying to set the transfer mode to binary or ASCII.",
        "18" => "A file transfer was shorter or larger than expected. This happens when the server first reports an expected transfer size, and then delivers data that does not match the previously given size.",
        "19" => "This was either a weird reply to a 'RETR' command or a zero byte transfer complete.",
        "20" => "Not used in modern versions.",
        "21" => "When sending custom \"QUOTE\" commands to the remote server, one of the commands returned an error code that was 400 or higher (for FTP) or otherwise indicated unsuccessful completion of the command.",
        "22" => "This is returned if CURLOPT_FAILONERROR is set TRUE and the HTTP server returns an error code that is >= 400.",
        "23" => "An error occurred when writing received data to a local file, or an error was returned to libcurl from a write callback.",
        "24" => "Not used in modern versions.",
        "25" => "Failed starting the upload. For FTP, the server typically denied the STOR command. The error buffer usually contains the server's explanation for this.",
        "26" => "There was a problem reading a local file or an error returned by the read callback.",
        "27" => "A memory allocation request failed. This is serious badness and things are severely screwed up if this ever occurs.",
        "28" => "Operation timeout. The specified time-out period was reached according to the conditions.",
        "29" => "Not used in modern versions.",
        "30" => "The FTP PORT command returned error. This mostly happens when you have not specified a good enough address for libcurl to use. See CURLOPT_FTPPORT.",
        "31" => "The FTP REST command returned error. This should never happen if the server is sane.",
        "32" => "Not used in modern versions.",
        "33" => "The server does not support or accept range requests.",
        "34" => "This is an odd error that mainly occurs due to internal confusion.",
        "35" => "A problem occurred somewhere in the SSL/TLS handshake. You really want the error buffer and read the message there as it pinpoints the problem slightly more. Could be certificates (file formats, paths, permissions), passwords, and others.",
        "36" => "The download could not be resumed because the specified offset was out of the file boundary.",
        "37" => "A file given with FILE:// could not be opened. Most likely because the file path does not identify an existing file. Did you check file permissions?",
        "38" => "LDAP cannot bind. LDAP bind operation failed.",
        "39" => "LDAP search failed.",
        "40" => "Not used in modern versions.",
        "41" => "Function not found. A required zlib function was not found.",
        "42" => "Aborted by callback. A callback returned \"abort\" to libcurl.",
        "43" => "A function was called with a bad parameter.",
        "44" => "Not used in modern versions.",
        "45" => "Interface error. A specified outgoing interface could not be used. Set which interface to use for outgoing connections' source IP address with CURLOPT_INTERFACE.",
        "46" => "Not used in modern versions.",
        "47" => "Too many redirects. When following redirects, libcurl hit the maximum amount. Set your limit with CURLOPT_MAXREDIRS.",
        "48" => "An option passed to libcurl is not recognized/known. Refer to the appropriate documentation. This is most likely a problem in the program that uses libcurl. The error buffer might contain more specific information about which exact option it concerns.",
        "49" => "An option passed in to a setopt was wrongly formatted. See error message for details about what option.",
        "51" => "Not used in modern versions.",
        "52" => "Nothing was returned from the server, and under the circumstances, getting nothing is considered an error.",
        "53" => "The specified crypto engine was not found.",
        "54" => "Failed setting the selected SSL crypto engine as default.",
        "55" => "Failed sending network data.",
        "56" => "Failure with receiving network data.",
        "57" => "Not used in modern versions.",
        "58" => "problem with the local client certificate.",
        "59" => "Could not use specified cipher.",
        "60" => "The remote server's SSL certificate or SSH fingerprint was deemed not OK. This error code has been unified with CURLE_SSL_CACERT since 7.62.0. Its previous value was 51.",
        "61" => "Unrecognized transfer encoding.",
        "62" => "Not used in modern versions.",
        "63" => "Maximum file size exceeded.",
        "64" => "Requested FTP SSL level failed.",
        "65" => "When doing a send operation curl had to rewind the data to retransmit, but the rewinding operation failed.",
        "66" => "Initiating the SSL Engine failed.",
        "67" => "The remote server denied curl to login (Added in 7.13.1)",
        "68" => "File not found on TFTP server.",
        "69" => "Permission problem on TFTP server.",
        "70" => "Out of disk space on the server.",
        "71" => "Illegal TFTP operation.",
        "72" => "Unknown TFTP transfer ID.",
        "73" => "File already exists and is not overwritten.",
        "74" => "This error should never be returned by a properly functioning TFTP server.",
        "76" => "Not used in modern versions.",
        "77" => "Problem with reading the SSL CA cert (path? access rights?)",
        "78" => "The resource referenced in the URL does not exist.",
        "79" => "An unspecified error occurred during the SSH session.",
        "80" => "Failed to shut down the SSL connection.",
        "81" => "Socket is not ready for send/recv. Wait until it is ready and try again. This return code is only returned from curl_easy_recv and curl_easy_send (Added in 7.18.2)",
        "82" => "Failed to load CRL file (Added in 7.19.0)",
        "83" => "Issuer check failed (Added in 7.19.0)",
        "84" => "The FTP server does not understand the PRET command at all or does not support the given argument. Be careful when using CURLOPT_CUSTOMREQUEST, a custom LIST command is sent with the PRET command before PASV as well. (Added in 7.20.0)",
        "85" => "Mismatch of RTSP CSeq numbers.",
        "86" => "Mismatch of RTSP Session Identifiers.",
        "87" => "Unable to parse FTP file list (during FTP wildcard downloading).",
        "88" => "Chunk callback reported error.",
        "89" => "(For internal use only, is never returned by libcurl) No connection available, the session is queued. (added in 7.30.0)",
        "90" => "Failed to match the pinned key specified with CURLOPT_PINNEDPUBLICKEY.",
        "91" => "Status returned failure when asked with CURLOPT_SSL_VERIFYSTATUS.",
        "92" => "Stream error in the HTTP/2 framing layer.",
        "93" => "An API function was called from inside a callback.",
        "94" => "An authentication function returned an error.",
        "95" => "A problem was detected in the HTTP/3 layer. This is somewhat generic and can be one out of several problems, see the error buffer for details.",
        "96" => "QUIC connection error. This error may be caused by an SSL library error. QUIC is the protocol used for HTTP/3 transfers.",
        "97" => "Proxy handshake error. CURLINFO_PROXY_ERROR provides extra details on the specific problem.",
        "98" => "SSL Client Certificate required.",
        "99" => "An internal call to poll() or select() returned error that is not recoverable.",
        "100" => "A value or data field grew larger than allowed.",
        "101" => "ECH was attempted but failed.",
    ];

    return $errors[$code];
}
