import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import { getUser } from '../redux/user/actions';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const Home = (props) => {
  const dispatch = useDispatch()

  const [ counter, setCounter ] = useState(0);

  const execScript = () => {
    const ctx = document.getElementById('surface').getContext('2d');
    const imageData = ctx.createImageData(800, 600);

    class Vector {
      x = 0;
      y = 0;
      z = 0;
      w = 1;

      constructor(x, y, z, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
      }

      static substruct(v1, v2) {
        return new Vector(
          v1.x - v2.x,
          v1.y - v2.y,
          v1.z - v2.z,
          v1.w - v2.w
        );
      }

      static scalarProduct(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z
      }

      static crossProduct(a, b) {
        return new Vector(
          a.y * b.z - a.z * b.y,
          a.z * b.x - a.x * b.z,
          a.x * b.y - a.y * b.x
        );
      }

      static add(v1, v2) {
        return new Vector(
          v1.x + v2.x,
          v1.y + v2.y,
          v1.z + v2.z
        );
      }

      multiplyByScalar(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;

        return this;
      }

      getLength() {
        return Math.sqrt(
          this.x * this.x + this.y * this.y + this.z * this.z
        );
      }

      normalize() {
        const length = this.getLength();

        this.x /= length;
        this.y /= length;
        this.z /= length;

        return this;
      }
    }

    class Matrix {
      static getLookAt(eye, target, up) {
        const vz = Vector.substruct(eye, target).normalize();
        const vx = Vector.crossProduct(up, vz).normalize();
        const vy = Vector.crossProduct(vz, vx).normalize();

        return Matrix.multiply(
          Matrix.getTranslation(-eye.x, -eye.y, -eye.z),
          [
            [vx.x, vx.y, vx.z, 0],
            [vy.x, vy.y, vy.z, 0],
            [vz.x, vz.y, vz.z, 0],
            [0, 0, 0, 1]
          ]);
      }

      static getPerspectiveProjection(fovy, aspect, n, f) {
        const radians = Math.PI / 180 * fovy;
        const sx = (1 / Math.tan(radians / 2)) / aspect;
        const sy = (1 / Math.tan(radians / 2));
        const sz = (f + n) / (f - n);
        const dz = (-2 * f * n) / (f - n);

        return [
          [sx, 0, 0, 0],
          [0, sy, 0, 0],
          [0, 0, sz, dz],
          [0, 0, -1, 0]
        ];
      }

      static multiply(a, b) {
        const m = [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];

        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 4; j++) {
            m[i][j] = a[i][0] * b[0][j] +
              a[i][1] * b[1][j] +
              a[i][2] * b[2][j] +
              a[i][3] * b[3][j];
          }
        }

        return m;
      }

      static getRotationX(angle) {
        const rad = Math.PI / 180 * angle;

        return [
          [1, 0, 0, 0],
          [0, Math.cos(rad), -Math.sin(rad), 0],
          [0, Math.sin(rad), Math.cos(rad), 0],
          [0, 0, 0, 1]
        ];
      }

      static getRotationY(angle) {
        const rad = Math.PI / 180 * angle;

        return [
          [Math.cos(rad), 0, Math.sin(rad), 0],
          [0, 1, 0, 0],
          [-Math.sin(rad), 0, Math.cos(rad), 0],
          [0, 0, 0, 1]
        ];
      }

      static getRotationZ(angle) {
        const rad = Math.PI / 180 * angle;

        return [
          [Math.cos(rad), -Math.sin(rad), 0, 0],
          [Math.sin(rad), Math.cos(rad), 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]
        ];
      }

      static getTranslation(dx, dy, dz) {
        return [
          [1, 0, 0, dx],
          [0, 1, 0, dy],
          [0, 0, 1, dz],
          [0, 0, 0, 1]
        ];
      }

      static getScale(sx, sy, sz) {
        return [
          [sx, 0, 0, 0],
          [0, sy, 0, 0],
          [0, 0, sz, 0],
          [0, 0, 0, 1]
        ];
      }

      static multiplyVector(m, v) {
        return new Vector(
          m[0][0] * v.x + m[0][1] * v.y + m[0][2] * v.z + m[0][3] * v.w,
          m[1][0] * v.x + m[1][1] * v.y + m[1][2] * v.z + m[1][3] * v.w,
          m[2][0] * v.x + m[2][1] * v.y + m[2][2] * v.z + m[2][3] * v.w,
          m[3][0] * v.x + m[3][1] * v.y + m[3][2] * v.z + m[3][3] * v.w
        );
      }
    }

    class Drawer {
      surface = null;
      width = 0;
      height = 0;

      constructor(surface, width, height) {
        this.surface = surface;
        this.width = width;
        this.height = height;
      }

      drawPixel(x, y, r, g, b) {
        x += this.width / 2;
        y = -(y - this.height / 2);
        const offset = (this.width * y + x) * 4;

        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          this.surface[offset] = r;
          this.surface[offset + 1] = g;
          this.surface[offset + 2] = b;
          this.surface[offset + 3] = 255;
        }
      }

      drawLine(x1, y1, x2, y2, r = 0, g = 0, b = 0) {
        const round = Math.trunc;
        x1 = round(x1);
        y1 = round(y1);
        x2 = round(x2);
        y2 = round(y2);

        const c1 = y2 - y1;
        const c2 = x2 - x1;

        const length = Math.max(
          Math.abs(c1),
          Math.abs(c2)
        );

        const xStep = c2 / length;
        const yStep = c1 / length;

        for (let i = 0; i <= length; i++) {
          this.drawPixel(
            Math.trunc(x1 + xStep * i),
            Math.trunc(y1 + yStep * i),
            r, g, b
          );
        }
      }

      clearSurface() {
        const surfaceSize = this.width * this.height * 4;
        for (let i = 0; i < surfaceSize; i++) {
          this.surface[i] = 0;
        }
      }
    }

    let cameraDirection = new Vector(0, 0, -1, 0);
    let cameraPos = new Vector(0, 0, 0);

    const drawer = new Drawer(
      imageData.data,
      imageData.width,
      imageData.height
    );

    // Cube vertices
    const vertices = [
      new Vector(-0.5, 1, 0.5), // 0 вершина
      new Vector(-0.5, 1, -0.5), // 1 вершина
      new Vector(0.5, 1, -0.5), // 2 вершина
      new Vector(0.5, 1, 0.5), // 3 вершина
      new Vector(-1, -1, 1), // 4 вершина
      new Vector(-1, -1, -1), // 5 вершина
      new Vector(1, -1, -1), // 6 вершина
      new Vector(1, -1, 1) // 7 вершина
    ];

    const indices = [
      [0, 1, 2], // 0
      [0, 2, 3], // 1

      [4, 6, 5], // 2
      [4, 7, 6], // 3

      [0, 5, 1], // 4
      [0, 4, 5], // 5

      [1, 5, 2], // 6
      [6, 2, 5], // 7

      [3, 2, 6], // 8
      [3, 6, 7], // 9

      [3, 4, 0], // 10
      [4, 3, 7], // 11
    ];

    let angle = 0;

    drawer.drawLine(0, 0, 100, 100, 0, 0, 0);
    ctx.putImageData(imageData, 0, 0);

    setInterval(() => {
      return;
      let matrix = Matrix.getRotationX(0);

      matrix = Matrix.multiply(
        Matrix.getRotationY(angle += 0.5),
        matrix
      );

      matrix = Matrix.multiply(
        Matrix.getScale(100, 100, 100),
        matrix
      );

      matrix = Matrix.multiply(
        Matrix.getTranslation(0, 0, -300),
        matrix
      );

      matrix = Matrix.multiply(
        Matrix.getLookAt(
          cameraPos,
          Vector.add(cameraPos, cameraDirection),
          new Vector(0, 1, 0)
        ),
        matrix
      );

      matrix = Matrix.multiply(
        Matrix.getPerspectiveProjection(
          90, 800 / 600,
          -1, -1000),
        matrix
      );

      const sceneVertices = [];
      for (let i = 0; i < vertices.length; i++) {
        let vertex = Matrix.multiplyVector(
          matrix,
          vertices[i]
        );

        vertex.x = vertex.x / vertex.w * 400;
        vertex.y = vertex.y / vertex.w * 300;

        sceneVertices.push(vertex);
      }

      drawer.clearSurface();

      for (let i = 0, l = indices.length; i < l; i++) {
        const e = indices[i];

        let v1 = sceneVertices[e[0]]
        let v2 = sceneVertices[e[1]]
        let v3 = sceneVertices[e[2]]

        let t1 = Vector.substruct(v1, v2)
        let t2 = Vector.substruct(v2, v3)

        let normal = Vector.crossProduct(t1, t2).normalize()

        let res = Vector.scalarProduct(cameraDirection, normal)

        if (res > 0) {
          drawer.drawLine(
            v1.x,
            v1.y,
            v2.x,
            v2.y,
            0, 0, 255
          );

          drawer.drawLine(
            v2.x,
            v2.y,
            v3.x,
            v3.y,
            0, 0, 255
          );

          drawer.drawLine(
            v1.x,
            v1.y,
            v3.x,
            v3.y,
            0, 0, 255
          );
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }, 1000 / 33);
  }

  const myRed = (arr, callback, initialValue) => {
    let previousValue;
    let currentValue = initialValue;

    for (let i = 0; i < arr.length; i++) {
      currentValue = callback(currentValue, arr[i], i, arr);
    }

    return currentValue;
  }


  useEffect(() => {
    const myArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const result1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduce((previousValue, currentValue, currentIndex, array) => {
      return previousValue + currentValue;
    }, 5);

    console.log('result1', result1);

    const result2 = myRed(myArr, (previousValue,  currentValue) => {
      return previousValue + currentValue;
    }, 5);

    console.log('result2', result2);
  })

  /*
  useEffect(() => {
    (async () => {
      console.log('LETS FETCH');
      let result;

      try {
        fetch('http://localhost:3007/asdfasd').then((response) => {
          console.log('response', response);
        });
      } catch (e) {
        console.log('error occured', e);
      } finally {
        console.log('We do cleanup here');
      }

      console.log('result', result);
    })()

    dispatch(getUser());
  })
  */

  const generatorFunction = function* () {
    let a = yield 'get A';
    console.log('a', a);

    let b = yield 'get B';
    console.log('b', b);

    return 'END';
  }

  // const myGen = generatorFunction();

  useEffect(() => {
    // myGen.next();
  }, []);

  const theFunc = async () => {
    const makeReject = true;
    const makeError = false;

    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (makeError) {
          throw new Error({ error: 'ERROR' });
        } else if (makeReject) {
          reject({ dataRej: { aaaaaa: 'aaaaaa' } })
        } else {
          resolve({ data: { ololo: 'AZAZAZ' } })
        }
      }, 1000);
    });

    const result = await myPromise;

    console.log('result', result);
  };

  useEffect(() => {
    // theFunc();
  }, []);

  const onDialogCancel = () => {
    //myGen.next(1);
  }
  const onDialogConfirm = () => {
    //myGen.next(2);
  }

  const onCounterClick = () => {
    console.log('onCounterClick');
    setCounter(1 + counter);
  }

  const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log();
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (evt) {
      console.log(evt.target.result);
    }
    reader.onerror = function (evt) {
      console.log('error reading file');
    }
  }

  function download(text, name, type) {
    var a = document.getElementById("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
  }

  const onBtnClick = () => {
    download('file text', 'myfilename.txt', 'text/plain')
  }

  return (
    <>
      <canvas id="surface" width="800" height="600" />
      <dialog open={false}>
        <p>adfs</p>
        <button onClick={onDialogCancel}>Cancel</button>
        <button onClick={onDialogConfirm}>Confirm</button>
      </dialog>
      <Header />
      <h1>Home</h1>
      <button onClick={onCounterClick}>Counter</button>
      <hr />

      <input type="file" onChange={onFileChange} />
      <hr />
      <a href="" id="a">click here to download your file</a>
      <button onClick={onBtnClick}>Create file</button>
    </>
  )
}

export default Home
