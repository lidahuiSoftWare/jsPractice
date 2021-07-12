import { useRef, useState } from 'react'
import './App.css';

function App() {
  const inputRef = useRef(null);
  const previewImgRef = useRef(null);
  const [previewImg, setPreviewImg] = useState(null);
  const canvasRef = useRef(null);

  /**监听图片并预览图片 */
  function onInputChange(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreviewImg(e.target.result);
      drawImageData(e.target.result);
    }
    fileReader.readAsDataURL(file);
  }

  /** 使用canvas 对图片进行加工为灰色图片 */
  function drawImageData (imgUrl) {
    let context2d = null;
    let drawing = canvasRef.current
    if(drawing.getContext) {
        context2d = drawing.getContext('2d');
    }

    if (context2d == null) {
        return;
    }

    let image = previewImgRef.current;
    image = document.createElement("img");
    image.src = imgUrl;
    context2d.drawImage(image, 0, 0, 200, 200);

    let imagedata = context2d.getImageData(0, 0, 200, 200);
    let data = imagedata.data;
    let i,len,red,green,blue,average; 
    /** 对图片颜色进行加工 */ 
    for (i = 0 , len = data.length; i < len; i+=4) {
        red = data[i];
        green = data[i + 1];
        blue = data[i + 2];
        //alpha = data[i + 3];
        average = Math.floor((red + green + blue) / 3);
        data[i] = average; 
        data[i+1] = average; 
        data[i+2] = average;
    }
    context2d.putImageData(imagedata, 0, 0);
  }

  /** 下载图片 */
  function downLoadImg(){
    let dataImg = new Image();
      dataImg.src = canvasRef.current.toDataURL("image/png");
    let alink = document.createElement("a");
      alink.href = dataImg.src;
      alink.download = "screenshot";
      alink.click();
  }

  return (
    <div className="App">
      <div className="input-image-container">
        <label hemlFor="choose-image-id" >请选择图片</label>
        <input id="choose-image-id" type="file" ref={inputRef}  onChange= {onInputChange}/>
      </div>
      {
        previewImg ? (
          <>
            <div className="preview-option-wrap">
              <img src={previewImg} ref={previewImgRef} className="previewImg" alt="预览图片"/>
              <canvas width={200} height={200} ref={canvasRef} className="canvas" />
            </div>
            <div onClick={downLoadImg}>下载图片</div>
          </>
        ) : null
      }
    
    </div>
  );
}

export default App;
