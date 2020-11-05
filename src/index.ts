// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const version: string = __VERSION__;

export { version };

type BasicClassNameType = string | number | Record<string, any>;
type FunctionClassNameType = () => BasicClassNameType;
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
    const val = !!clz[key];
    stringParser(key).forEach((item) => {
      clzMap.set(item, val);
    });
  });
  return clzMap;
}

export function classNames<T>(...args: ClassNameType<T>[]): string {
  const clzMap = new Map<string, boolean>();
  // 铺平
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
