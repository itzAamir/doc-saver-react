import React from 'react';
import { saveAs } from 'file-saver';

const DownloadButton = ({url, name}) => {

    function downloadImg() {
        saveAs(url, "image.png")
    }

    return ( 
        <>
        <button className="btn btn-danger" onClick={downloadImg}>Download</button>
        </>
     );
}
 
export default DownloadButton;