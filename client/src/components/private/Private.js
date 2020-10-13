import React from 'react';
import Image1 from '../../images/private-bg/dan-dennis-giraffe.jpg';
import Image2 from '../../images/private-bg/diane-alkier-banana.jpg';
import Image3 from '../../images/private-bg/ryan-franco-child.jpg';
import Image4 from '../../images/private-bg/ryan-grewell-bear.jpg';

import Main from '../layout/Main';

const Private = props => {
  const backgrounds = [ Image1, Image2, Image3, Image4 ];
  const backgroundsLength = backgrounds.length;
  let randNum = Math.floor(Math.random() * backgroundsLength);
  let background = backgrounds[randNum];
  return (
    <Main mainNoPadding>
      <div
        className="private"
        style={{
          padding: 0,
          backgroundImage: `url(${background})`
        }}
      ></div>
    </Main>
  )
}

export default Private;