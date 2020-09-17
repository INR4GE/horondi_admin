import * as Yup from 'yup';
import {useMemo} from "react";
import {config} from "../configs";
import {useSelector} from "react-redux";
import {productsTranslations} from "../translations/product.translations";

const { productInfoLabels, languages } = config

const {
    REQUIRED_FIELD,
    NAME_TOO_LONG_MESSAGE,
    NAME_TOO_SHORT_MESSAGE,
    MAIN_MATERIAL_TOO_LONG_MESSAGE,
    MAIN_MATERIAL_TOO_SHORT_MESSAGE,
    INNER_MATERIAL_TOO_LONG_MESSAGE,
    INNER_MATERIAL_TOO_SHORT_MESSAGE,
    CLOSURE_TOO_LONG_MESSAGE,
    CLOSURE_TOO_SHORT_MESSAGE,
    DESCRIPTION_TOO_SHORT_MESSAGE
} = productsTranslations

const useProductValidation = (checkedLanguages) => {
    const {
        name,
        mainMaterial,
        innerMaterial,
        closure,
        description,
        productToSend
    } = useSelector(({ Products: { productToSend } }) => ({
        productToSend,
        name: productToSend.name,
        mainMaterial: productToSend.mainMaterial,
        innerMaterial: productToSend.innerMaterial,
        closure: productToSend.closure,
        description: productToSend.description
    }));

    const formikSpeciesValues = {
        category: productToSend.category,
        pattern: productToSend.pattern.length
            ? productToSend.pattern[0].value
            : '',
        colors: productToSend.colors.length
            ? productToSend.colors[0].simpleName[0].value
            : '',
        subcategory: productToSend.subcategory,
        model: productToSend.model,
        basePrice: productToSend.basePrice,
        strapLengthInCm: productToSend.strapLengthInCm
    }

    const formikInfoValues = Object.assign(
        ...languages.map((lang, idx) => ({
            [`${lang}${productInfoLabels[0].name}`]: name[idx].value,
            [`${lang}${productInfoLabels[1].name}`]: mainMaterial[idx].value,
            [`${lang}${productInfoLabels[2].name}`]: innerMaterial[idx].value,
            [`${lang}${productInfoLabels[3].name}`]: closure[idx].value,
            [`${lang}${productInfoLabels[4].name}`]: description[idx].value
        }))
    );

    const yupInfoSchema = useMemo(
        () =>
                checkedLanguages.length
                    ? Object.assign(
                    ...checkedLanguages.map(({ name }) => ({
                        [`${name}${productInfoLabels[0].name}`]: Yup.string()
                            .min(6, NAME_TOO_SHORT_MESSAGE)
                            .max(50, NAME_TOO_LONG_MESSAGE)
                            .required(REQUIRED_FIELD),
                        [`${name}${productInfoLabels[1].name}`]: Yup.string()
                            .min(2, MAIN_MATERIAL_TOO_SHORT_MESSAGE)
                            .max(50, MAIN_MATERIAL_TOO_LONG_MESSAGE)
                            .required(REQUIRED_FIELD),
                        [`${name}${productInfoLabels[2].name}`]: Yup.string()
                            .min(2, INNER_MATERIAL_TOO_SHORT_MESSAGE)
                            .max(50, INNER_MATERIAL_TOO_LONG_MESSAGE)
                            .required(REQUIRED_FIELD),
                        [`${name}${productInfoLabels[3].name}`]: Yup.string()
                            .min(2, CLOSURE_TOO_SHORT_MESSAGE)
                            .max(50, CLOSURE_TOO_LONG_MESSAGE)
                            .required(REQUIRED_FIELD),
                        [`${name}${productInfoLabels[4].name}`]: Yup.string()
                            .min(10, DESCRIPTION_TOO_SHORT_MESSAGE)
                            .required(REQUIRED_FIELD)
                    }))
                    )
                    : {},
        [checkedLanguages]
    );

    const yupSpeciesSchema = {
        category: Yup.string().required(),
        subcategory: Yup.string().required(),
        pattern: Yup.string().required(),
        colors: Yup.string().required(),
        model: Yup.string().required(),
        basePrice: Yup.number().min(1).required(),
        strapLengthInCm: Yup.number().min(1).required()
    }

    return {
        yupInfoSchema,
        formikInfoValues,
        yupSpeciesSchema,
        formikSpeciesValues
    }
}

export default useProductValidation