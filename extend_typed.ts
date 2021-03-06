

{ // block

    // decorator?
    const hasOwnProperty: (prop:string) => boolean = Object.prototype.hasOwnProperty;
    const toString: () => string = Object.prototype.toString;

    /**
     * Проверяет, что переданный объект является "плоским" (т.е. созданным с помощью "{}"
     * или "new Object").
     *
     * @param {Object} obj
     * @returns {Boolean}
     */
    function isPlainObject(obj:Object):boolean {
        if (toString.call(obj) !== '[object Object]') {
            return false;
        }

        const prototype = Object.getPrototypeOf(obj);
        return prototype === null ||
            prototype === Object.prototype;
    }


    /**
     * Копирует перечислимые свойства одного или нескольких объектов в целевой объект.
     *
     * @param {Boolean} [deep=false] При значении `true` свойства копируются рекурсивно.
     * @param {Object} target Объект для расширения. Он получит новые свойства.
     * @param {...Object} objects Объекты со свойствами для копирования. Аргументы со значениями
     *      `null` или `undefined` игнорируются.
     * @returns {Object}
     */
  //  function extend(deep: boolean, ...args: object[]):object;
  // function extend(...args: object[]):object;

    const extend = function extend(...args: Array<Object | boolean>):Object {
        let target:Object | boolean = args[0];
        let deep: boolean;
        let i: number;

        // Обрабатываем ситуацию глубокого копирования.
        if (typeof target === 'boolean') {
            deep = target as boolean;
            target = args[1] as Object;
            i = 2;
        } else {
            deep = false;
            i = 1;
        }

        for (; i < arguments.length; i++) {
            const obj:Object = args[i] as Object;
            if (!obj) {
                continue;
            }

            for (const key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    const val:any = obj[key];
                    const isArray:boolean = val && Array.isArray(val);

                    // Копируем "плоские" объекты и массивы рекурсивно.
                    if (deep && val && (isPlainObject(val) || isArray)) {
                        const src: Object | Array<any> = target[key];
                        let clone: Object | Array<any>;
                        if (isArray) {
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[key] = extend(deep, clone, val);
                    } else {
                        target[key] = val;
                    }
                }
            }
        }
        return target;
    };

    const ob1:Object = { name: 'Oleg'};
    const ob2:Object = { score: {tag:'lol'}};

    const merged = extend({},ob1,ob2);

    ob2['score'].tag = 'err';

    console.log(merged);

}


