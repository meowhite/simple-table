1. Build
  Change `0.0.x` to the next version
```
$ docker build int-registry.fortna.com/microfe/demo-table:0.0.x .
$ docker tag int-registry.fortna.com/microfe/demo-table:0.0.x
$ docker push int-registry.fortna.com/microfe/demo-table:0.0.x
```
1. Run
```
$ docker run -it --rm \
  -p 0.0.0.0:28000:9000 \
  int-registry.fortna.com/microfe/demo-table:0.0.x
```