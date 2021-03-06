ifs
=======

instant file server (ifs) turns any directory into an instant file server, and it runs directly from your command line. Install it once per machine and then run it in as many directories as you'd like.

[Watch the IFS video tutorial!][2]

## HTTP Conventions

* __GET__ - reads the contents a file from the specified path
* __POST__ - overwrite or create a file
* __PUT__ - update the contents of a file (__not implemented__)
* __DELETE__ - delete a file from the system

## Installation
instant-server can be installed via [Node Package Manager][0].

Best results when you install globally using the `-g` flag on NPM.

````
$ npm install -g ifs
$ (ifs is added to your PATH; go anywhere on your system)
$ ifs -help
$ ifs [arguments...]
... starting ifs on 0.0.0.0:1337
````

## Usage

Using ifs is easy - after installing it globally, run it anywhere on the commandline:

````
$: ifs [-port #] [-hostname <host>] [-d <directory>]
````

And it'll start automatically.

See more [ifs examples][1].

 [0]: http://npmjs.org/
 [1]: https://github.com/Aaronontheweb/instant-fileserver/tree/master/examples
 [2]: http://www.youtube.com/watch?v=kUlzDFis7Q8 "Using Instant File Server (IFS) [Video Tutorial]"
