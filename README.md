ifs
=======

instant file server (ifs) turns any directory into an instant file server, and it runs directly from your command line. Install it once per machine and then run it in as many directories as you'd like.

## HTTP Conventions

* __GET__ - reads the contents a file from the specified path
* __POST__ - append the contents of a file
* __PUT__ - overwrite the contents of a file 
* __DELETE__ - delete a file from the system

## Installation
instant-server can be installed via (Node Package Manager)[0]

````
$ npm install ifs
$ (instant-server is added to your PATH; go anywhere on your system)
$ ifs -help
$ ifs [arguments...]
... starting
````

 [0]: http://npmjs.org/