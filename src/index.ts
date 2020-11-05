/**
 * 版本号
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const version: string = __VERSION__;

export { version };

/**
 * classNames 方法参数的基本类型 - string，number, object
 */
type BasicClassNameType = string | number | Record<string, any>;
/**
 * classNames 方法参数的特殊类型 - function，classNames 执行时，会先执行该传入的函数
 */
type FunctionClassNameType = () => any;
/**
 * classNames 方法参数的复合类型
 */
type ClassNameType<T extends BasicClassNameType | FunctionClassNameType> = T | T[];

/**
 * @param type -
 * @internal
 */
function type<T>(type: T): string {
  const ts = Object.prototype.toString.call(type);
  switch (ts) {
    case '[object String]':
      return 'String';
    case '[object Number]':
      return 'Number';
    case '[object Object]':
      return 'Object';
    case '[object Function]':
      return 'Function';
    case '[object Array]':
      return 'Array';
    default:
      return 'Unknown';
  }
}

/**
 * @internal
 */
function stringParser(clz: string): string[] {
  return clz.split(' ').filter((item) => '' !== item);
}

/**
 * @internal
 */
function objectParser(clz: Record<string, any>): Map<string, boolean> {
  const clzMap = new Map<string, boolean>();
  Object.keys(clz).forEach((key) => {
    const flag = !!clz[key];
    stringParser(key).forEach((item) => {
      clzMap.set(item, flag);
    });
  });
  return clzMap;
}

/**
 * 将多个 className 进行合并，生成不会重复的 className
 * @param args - 可传入多个且不同类型的 className
 */
export function classNames<T>(...args: ClassNameType<T>[]): string {
  const clzMap = new Map<string, boolean>();
  args.forEach((item) => {
    switch (type(item)) {
      case 'String':
        stringParser((item as unknown) as string).forEach((clz) => {
          clzMap.set(clz, true);
        });
        break;
      case 'Number':
        clzMap.set(`${item}`, true);
        break;
      case 'Object':
        const objClzMap = objectParser(item);
        for (const [k, v] of objClzMap.entries()) {
          clzMap.set(k, v);
        }
        break;
      case 'Function':
        stringParser(classNames(((item as unknown) as FunctionClassNameType)())).forEach((clz) => {
          clzMap.set(clz, true);
        });
        break;
      case 'Array':
        stringParser(classNames(...item)).forEach((clz) => {
          clzMap.set(clz, true);
        });
        break;
      default:
        break;
    }
  });
  const clz: string[] = [];
  for (const [k, v] of clzMap.entries()) {
    if (v) {
      clz.push(k);
    }
  }
  return clz.join(' ');
}

export default classNames;
