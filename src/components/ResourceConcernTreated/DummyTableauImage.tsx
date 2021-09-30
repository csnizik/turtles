import { useState } from 'react';

const DummyTableauImage = () => {
  // state was manually chosen as "Colorado" and the top five
  const tableauUrl =
    'https://publicdashboards.dl.usda.gov/t/FPAC_PUB/views/EQIPTopPracticesTest/TopPractices.png?State%20Name%20with%20Total=Colorado&Top%20Practice%20Rank=1,2,3,4,5';
  const [base64Url, setBase64Url] = useState('');
  async function parseURI(d) {
    const reader = new FileReader();
    reader.readAsDataURL(d);
    // eslint-disable-next-line no-unused-vars
    return new Promise((res, rej) => {
      reader.onload = (e: any) => {
        res(e.target.result);
      };
    });
  }

  async function getDataBlob(url) {
    const res = await fetch(url);
    const blob = await res.blob();
    const uri: any = await parseURI(blob);
    setBase64Url(uri);
  }

  getDataBlob(tableauUrl);

  return (
    <>
      {/* <img 
        alt='Tableau Icon'
        // eslint-disable-next-line global-require
        src={require('./image/Tableau-IconPlaceholder.png').default}      
      /> */}
      <img alt='Tableau Icon' src={base64Url} />
    </>
  );
};

export default DummyTableauImage;
