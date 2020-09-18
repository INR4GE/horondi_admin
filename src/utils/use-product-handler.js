import {useState, useMemo, useCallback, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { config } from '../configs';

const {
  selectedLanguages,
  productOptionsValues,
  languages
} = config;

const useProductHandler = () => {
  const {
    filterData,
    productOptions,
    modelsForSelectedCategory,
    initialOptions,
    productToSend
  } = useSelector(({ Products }) => ({
    filterData: Products.filterData,
    productOptions: Products.productOptions,
    modelsForSelectedCategory: Products.productSpecies.modelsForSelectedCategory,
    initialOptions: Products.productToSend.options,
    productToSend: Products.productToSend
  }));

  useEffect(() => {
    setPreferedLanguages({
      ['uk']: {
        name: 'uk',
        checked: !!productToSend.name[0].value
      },
      ['en']: {
        name: 'en',
        checked: !!productToSend.name[1].value
      }
    })
  }, [productToSend.name])

  const uniqueSizes = useMemo(
      () => [
        ...new Set(
            initialOptions.length
                ? initialOptions.map(({ size: { available, name } }) => available && name)
                : null
        )
      ],
      [initialOptions]
  );

  const uniqueBottomMaterials = useMemo(
      () => [
        ...new Set(
            initialOptions.length
                ? initialOptions.map(({ bottomMaterial: item }) =>
                    item && item.available ? item.name[0].value : null
                )
                : null
        )
      ],
      [initialOptions]
  );

  const uniqueAdditions = useMemo(
      () => [
        ...new Set(
            initialOptions.length
                ? initialOptions
                    .filter(({ additions }) => additions.length > 0)
                    .map(
                        ({ additions: [{ available, name }] }) =>
                            available && name[0].value
                    )
                : null
        )
      ],
      [initialOptions]
  );

  const [preferedLanguages, setPreferedLanguages] = useState(selectedLanguages);
  const [selectedOptions, setOptions] = useState(productOptionsValues);
  const [ primaryImage, setPrimaryImage ] = useState('')
  const [ additionalImages, setAdditionalImages ] = useState([])

  useEffect(() => {
    if(initialOptions.length) {
      setOptions({
        sizes: uniqueSizes,
        bottomMaterials: uniqueBottomMaterials,
        additions: !!uniqueAdditions.length
      })
    }
  }, [initialOptions])

  const { bottomMaterials: materials, sizes } = productOptions;

  const checkedLanguages = useMemo(
      () => Object.values(preferedLanguages).filter(({ checked }) => checked),
      [preferedLanguages]
  );

  const categoriesNames = useMemo(
    () => [
      ...new Set(filterData.map(({ category }) => category.name[0].value))
    ],
    [filterData]
  );

  const categories = useMemo(
    () =>
      categoriesNames.map(
        (category) =>
          filterData.find(
            ({ category: { name } }) => category === name[0].value
          ).category
      ),
    [filterData, categoriesNames]
  );

  const colorsNames = useMemo(
    () => [
      ...new Set(filterData.map(({ colors }) => colors[0].simpleName[0].value))
    ],
    [filterData]
  );

  const colors = useMemo(
    () =>
      colorsNames.map(
        (color) =>
          filterData.find(
            ({ colors }) => colors[0].simpleName[0].value === color
          ).colors
      ),
    [filterData, colorsNames]
  );

  const patternsNames = useMemo(
    () => [...new Set(filterData.map(({ pattern }) => pattern[0].value))],
    [filterData]
  );

  const patterns = useMemo(
    () =>
      patternsNames.map(
        (item) =>
          filterData.find(({ pattern }) => pattern[0].value === item).pattern
      ),
    [filterData, patternsNames]
  );

  const modelNames = useMemo(
    () => [...new Set(filterData.map(({ model }) => model[0].value))],
    [filterData]
  );

  const models = useMemo(
    () =>
      modelNames.map(
        (item) => filterData.find(({ model }) => model[0].value === item).model
      ),
    [filterData, modelNames]
  );

  const additions = useMemo(
    () =>
      filterData.length
        ? filterData[1].options.find(({ additions }) => additions.length)
          .additions
        : null,
    [filterData]
  );

  const sizeOptions = useMemo(
    () =>
      selectedOptions.sizes
        ? selectedOptions.sizes.map(
          (size) => sizes.find(({ name }) => name === size)._id
        )
        : [],
    [selectedOptions.sizes, sizes]
  );

  const materialsOptions = useMemo(
    () =>
      selectedOptions.bottomMaterials
        ? selectedOptions.bottomMaterials.map(
          (item) => materials.find(({ name }) => item === name[0].value)._id
        )
        : [],
    [selectedOptions.bottomMaterials, materials]
  );

  const options = useMemo(() => {
    const sizeObj = {
      arr: sizeOptions,
      name: 'size'
    };
    const materialsObj = {
      arr: materialsOptions,
      name: 'bottomMaterial'
    };
    let objToMap; let objToAggregate;

    if (sizeOptions.length > materialsOptions.length) {
      objToMap = sizeObj;
      objToAggregate = materialsObj;
    } else {
      objToMap = materialsObj;
      objToAggregate = sizeObj;
    }

    return objToMap.arr.map((item, idx) => {
      const { name: mappedName } = objToMap;
      const { name: aggregatedName } = objToAggregate;
      const aggregatedItem = objToAggregate.arr[idx]
        ? { [aggregatedName]: objToAggregate.arr[idx] }
        : {};
      const additionsToSend = selectedOptions.additions ? { additions } : [];

      return {
        [mappedName]: item,
        ...aggregatedItem,
        ...additionsToSend
      };
    });
  }, [sizeOptions, materialsOptions, additions, selectedOptions.additions]);

  const getColorToSend = (color) =>
      colors.find((item) => item[0].simpleName[0].value === color);

  const getPatternToSend = (pattern) =>
      patterns.find((item) => pattern === item[0].value);

  const getModelToSend = (model) =>
      modelsForSelectedCategory.find(({ _id }) => _id === model);

  const createProductInfo = ({
    ukname,
    enname,
    ukmainMaterial,
    enmainMaterial,
    ukinnerMaterial,
    eninnerMaterial,
    ukclosure,
    enclosure,
    ukdescription,
    endescription
  }) => ({
    name: [
      { lang: languages[0], value: ukname },
      { lang: languages[1], value: enname }
    ],
    mainMaterial: [
      { lang: languages[0], value: ukmainMaterial },
      { lang: languages[1], value: enmainMaterial }
    ],
    innerMaterial: [
      { lang: languages[0], value: ukinnerMaterial },
      { lang: languages[1], value: eninnerMaterial }
    ],
    closure: [
      { lang: languages[0], value: ukclosure },
      { lang: languages[1], value: enclosure }
    ],
    description: [
      { lang: languages[0], value: ukdescription },
      { lang: languages[1], value: endescription }
    ]
  });

  const getSelectedCategory = useCallback((category) => categories.find(({ _id }) => category === _id), [categories])

  return {
    preferedLanguages,
    setPreferedLanguages,
    models,
    modelNames,
    colors,
    colorsNames,
    categories,
    categoriesNames,
    patterns,
    patternsNames,
    selectedOptions,
    setOptions,
    additions,
    options,
    primaryImage,
    setPrimaryImage,
    additionalImages,
    setAdditionalImages,
    createProductInfo,
    getColorToSend,
    getModelToSend,
    getPatternToSend,
    getSelectedCategory,
    checkedLanguages
  };
};

export default useProductHandler;
