"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;
/**
 * Проверяет, что переданный объект является "плоским" (т.е. созданным с помощью "{}"
 * или "new Object").
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
const isPlainObject = (obj) => {
    if (toString.call(obj) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(obj);
    return prototype === null ||
        prototype === Object.prototype;
};
/**
 * Копирует перечислимые свойства одного или нескольких объектов в целевой объект.
 *
 * @param {Boolean} [deep=false] При значении `true` свойства копируются рекурсивно.
 * @param {Object} target Объект для расширения. Он получит новые свойства.
 * @param {...Object} objects Объекты со свойствами для копирования. Аргументы со значениями
 *      `null` или `undefined` игнорируются.
 * @returns {Object}
 */
const extend = (flag, ...args) => {
    let target = args[0];
    let deep;
    let i;
    // Обрабатываем ситуацию глубокого копирования.
    if (typeof flag === 'boolean') {
        deep = flag;
        i = 1;
    }
    else {
        deep = false;
        target = flag;
        i = 0;
    }
    for (; i < args.length; i++) {
        const obj = args[i];
        if (!obj) {
            continue;
        }
        for (const key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                const val = obj[key];
                const isArray = val && Array.isArray(val);
                // Копируем "плоские" объекты и массивы рекурсивно.
                if (deep && val && (isPlainObject(val) || isArray)) {
                    const src = target[key];
                    let clone;
                    if (isArray) {
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    target[key] = extend(deep, clone, val);
                }
                else {
                    target[key] = val;
                }
            }
        }
    }
    return target;
};
