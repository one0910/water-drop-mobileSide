import { ReactSVG } from 'react-svg';

interface IProps {
  src?: string;
  height?: string;
  width?: string;
  color?: string;
}
/**
* SVG 顏色修改器
*/
const SvgWrapper = ({ src = '', width = '20', height = '20', color = '' }: IProps) => {
  if (!src) {
    return null;
  }

  const beforeInjectionHandler = (svg: SVGSVGElement) => {
    svg.setAttribute('style', `height: ${height};width:${width}`);
    svg.childNodes.forEach((item) => {
      const it = item as HTMLElement;
      if (it.tagName === 'path' && color) {
        it.setAttribute('fill', color);
      }
    });
  }


  return (
    <ReactSVG
      src={src}
      wrapper="span"
      beforeInjection={beforeInjectionHandler}
    />
  );
};

export default SvgWrapper;
