import Vue, { VNode } from 'vue';
import props from './props/props';
import useSizeProps from '../utils/use-size-props';
import ConfigContext from '../utils/config-context';
import { checkLinkAndLoad } from '../utils/check-url-and-load';

import '../style/css';

const { classPrefix } = ConfigContext;

const CDN_ICONFONT_URL = 'https://tdesign.gtimg.com/icon/0.1.0/fonts/index.css';

export const IconFont = Vue.extend({
  name: 'IconFont',
  props,

  computed: {
    classes(): ClassName {
      const tName = `${classPrefix}-icon`;

      const { className: sizeClassName } = useSizeProps(this.size);
      const iconName = this.url ? this.name : `${tName}-${this.name}`;
      const arr = [
        tName,
        iconName,
        sizeClassName,
      ];
      return arr;
    },
    iconStyle(): Styles {
      if (['small', 'medium', 'large'].includes(this.size)) return {};
      return {
        'font-size': this.size,
      };
    },
  },
  mounted() {
    let finalUrl: Array<string> = [];

    if (this.url) {
      finalUrl = this.url instanceof Array ? this.url.concat() : [this.url];
    }
    if (this.loadDefaultIcons) {
      finalUrl.push(CDN_ICONFONT_URL);
    }

    Array.from(new Set(finalUrl)).forEach((url: string) => {
      checkLinkAndLoad(url, `${classPrefix}-iconfont-stylesheet--unique-class`);
    });
  },
  methods: {
    handleClick(e: MouseEvent) {
      this.$emit('click', { e });
      this.onClick?.({ e });
    },
  },
  render(): VNode {
    const Component = this.tag;
    return <Component class={this.classes} style={this.iconStyle} onClick={this.handleClick}></Component>;
  },
});

export default IconFont;
