import { Model, DataTypes, ValidationError, ValidationErrorItem } from 'sequelize';
import sequelize from "../services/sequelize";

type SignalementCoordinatesType = {
    latitude: number;
    longitude: number;
}

export enum SignalementDangerItemsEnum {
    AUTRE = 'Autre',
    VOL = 'Vol',
    HARCELEMENT = 'Harcèlement',
    AGRESSION_SEXUELLE = 'Agression sexuelle',
    AGRESSION_PHYSIQUE = 'Agression physique',
    JE_ME_FAIS_SUIVRE = 'Je me fais suivre'
}

class Signalement extends Model {
    declare id: number;
    declare userId: string;
    declare coordinates: SignalementCoordinatesType;
    declare selectedDangerItems: SignalementDangerItemsEnum[];

    // Méthode de validation pour les éléments de danger sélectionnés
    validateSelectedDangerItems(items: SignalementDangerItemsEnum[]) {
        const invalidItems = items.filter(item => !Object.values(SignalementDangerItemsEnum).includes(item));
        if (invalidItems.length > 0) {
            const errors = invalidItems.map(item => new ValidationErrorItem(
                `Invalid value in selectedDangerItems: ${item}`,// message
                'validation error',                             // type
                'selectedDangerItems',                          // path
                item,                                           // value
                this,                                           // instance
                '',                                             // validatorKey
                '',                                             // fnName
                []                                              // fnArgs
            ));

            throw new ValidationError('Validation error', errors);
        }
    }
}

Signalement.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordinates: {
        type: DataTypes.JSON,
        allowNull: false,
        get() {
            const rawValue: string = this.getDataValue('coordinates');
            try {
                return JSON.parse(rawValue);
            } catch (e) {
                return rawValue;
            }
        }
    },
    selectedDangerItems: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            const rawValue: string = this.getDataValue('selectedDangerItems');
            return rawValue ? rawValue.split(',') : [];
        },
        set(value: SignalementDangerItemsEnum[]) {
            this.validateSelectedDangerItems(value);
            this.setDataValue('selectedDangerItems', value.join(','));
        }
    }
}, {
    sequelize,
    modelName: 'Signalement',
    tableName: 'signalements',
});

export default Signalement;
