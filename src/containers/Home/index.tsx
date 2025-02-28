import { SearchBar } from 'antd-mobile';
import { useState } from 'react';

import style from './index.module.less';
import TypeSelect from './components/TypeSelect';
import ProductList from './components/ProductList';


/**
* 精選課程
*/
const Home = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  // 搜尋時
  const onSearchHandler = (value: string) => {
    setName(value)
  };

  //點擊課程類別時
  const onTypeChangeHandler = (key: string) => {
    setType(key);
  };


  return (
    <div className={style.container}>
      <SearchBar
        placeholder="搜索課程試試"
        onSearch={onSearchHandler}
      />
      <TypeSelect onChange={onTypeChangeHandler} />
      <ProductList name={name} type={type} />
    </div>
  );
};

export default Home;
