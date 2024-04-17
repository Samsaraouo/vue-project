<script>
class Popup {
    constructor(info) {
      this.id = 0;
      //如果有div就移除
      if (document.getElementsByClassName("bx-popup-ctn").length > 0) {
        
        var elements = document.getElementsByClassName('bx-popup-ctn');
        for (var i = 0; i < elements.length; i++) {
          // 确保元素是父元素的直接子元素，然后移除它
          if (elements[i].parentNode) {
              elements[i].parentNode.removeChild(elements[i]);
          }
      }}
      this.viewer = info.viewer; //弹窗创建的viewer
      this.geometry = info.geometry; //弹窗挂载的位置
      this.id = "popup_" + this.__proto__.id++;
      this.ctn = document.createElement("div");
      this.ctn.classList.add("bx-popup-ctn");
      this.ctn.id = this.id;
      this.viewer.container.append(this.ctn);
      //创建Html
      this.ctn.innerHTML = this.createHtml(info.name, info.properties);
      this.render(this.geometry);
      //添加监听拖动重新渲染位置
      this.eventListener = this.viewer.clock.onTick.addEventListener(clock => {
        this.render(this.geometry);
      });
      //绑定关闭事件
      document.getElementsByClassName(
        "leaflet-popup-close-button"
      )[0].onclick = () => {
        this.close();
      };
    }
    //渲染位置
    render(geometry) {
      var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
        this.viewer.scene,
        geometry
      );
      this.ctn.style.left = position.x - this.ctn.offsetWidth / 2 + "px";
      this.ctn.style.top = position.y - this.ctn.offsetHeight - 30 + "px";
    }
    createHtml(header, content) {
      var html =
        '<div class="bx-popup-header-ctn">' +
        header +
        '<span class="leaflet-popup-close-button" ><i class="el-icon-close"></i></span>' +
        "</div>" +
        '<div class="bx-popup-content-ctn" >' +
        '<div class="bx-popup-content" >' +
        this.createTable(content) +
        "</div>" +
        "</div>" +
        '<div class="bx-popup-tip-container" >' +
        '<div class="bx-popup-tip" >' +
        "</div>" +
        "</div>";
      return html;
    }
    createTable(content) {
      let html = '<table class="table-popup">';
      for (let key in content) {
        html += `<tr><td class="title-popup">${key}</td>
             <td class="value-popup">${content[key]}</td></tr>`;
      }
      html += "</table>";
      return html;
    }
    close() {
      this.ctn.remove();
      this.viewer.clock.onTick.removeEventListener(this.eventListener);
    }
  }
  export default Popup;
</script>
  
<template>

</template>
  
<style>
  .bx-popup-ctn {
  position: absolute;
  z-index: 999;
  background: #fff;
}
 
.bx-popup-tip-container {
  width: 40px;
  height: 20px;
  position: absolute;
  left: 50%;
  margin-left: -20px;
  overflow: hidden;
  pointer-events: none;
}
 
.bx-popup-tip {
  width: 17px;
  background: #fff;
  height: 17px;
  padding: 1px;
  margin: -10px auto 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
 
.bx-popup-header-ctn {
  background: #b9a620;
  color: #fff;
  font-size: 15px;
  padding: 10px;
  text-align: center;
}
 
.bx-popup-content-ctn {
  padding: 5px;
}
 
.leaflet-popup-close-button {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
 
.table-popup {
  border-collapse: collapse;
  text-align: center;
}
 
.table-popup tr {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
  padding: 5px;
}
 
.table-popup .title-popup {
  width: 100px;
  background-color: #CCE8EB;
}
 
.table-popup .value-popup {
  width: 120px;
}
</style>