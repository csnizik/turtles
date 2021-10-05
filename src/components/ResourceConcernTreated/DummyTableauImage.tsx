import { useEffect, useState } from 'react';

const DummyTableauImage = () => {
  // state was manually chosen as "Colorado" and the top five
  const tableauUrl =
    'https://publicdashboards.dl.usda.gov/t/FPAC_PUB/views/EQIPTopPracticesTest/TopPractices.png?State%20Name%20with%20Total=Colorado&Top%20Practice%20Rank=1,2,3,4,5';
  const [updateUrl, setUpdateUrl] = useState('');
  async function parseURI(d) {
    const reader = new FileReader();
    reader.readAsDataURL(d);
    return new Promise((res, rej) => {
      reader.onload = (e: any) => {
        res(e.target.result);
      };
      reader.onerror = (error) => {
        rej(error);
      };
    });
  }

  async function getDataBlob(url) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const uri: any = await parseURI(blob);
      setUpdateUrl(uri);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  useEffect(() => {
    getDataBlob(tableauUrl);
  }, []);

  if (updateUrl === '') {
    setUpdateUrl(tableauUrl);
    // return <h2>Loading...</h2>;
  }

  return (
    <>
      {/* <img 
        alt='Tableau Icon'
        // eslint-disable-next-line global-require
        src={require('./image/Tableau-IconPlaceholder.png').default}      
      /> */}
      <img alt='Tableau Icon' src={updateUrl} />
    </>
  );
};

export default DummyTableauImage;
