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
    JE_ME_FAIS_SUIVRE = 'Je me fais suivre',
    INCENDIE = 'Incendie',
    METEO = 'Météo',
    TRAVEAUX = 'Travaux',
    MANQUE_ACCESSIBILITE = 'Manque d\'accessibilité',
    VOITURE = 'Voiture',
    VIOLENCE = 'Violence',
    AGRESSION_VERBALE = 'Agression verbale',
    INONDATION = 'Inondation',
    TROU_SUR_LA_CHAUSSEE = 'Trou sur la chaussée',
    OBSTABCLE_SUR_LA_CHAUSSEE = 'Obstacle sur la chaussée',
    PERSONNE_IVRE = 'Personne ivre',
    CONDUITE_DANGEREUSE = 'Conduite dangereuse',
    FEU_DE_PIETON_DYSFONCTIONNEL = 'Feu de piéton dysfonctionnel',
    MAUVAIS_ECLAIRAGE = 'Mauvais éclairage',

}

class Signalement extends Model {
    declare id: number;
    declare userId: string;
    declare coordinates: SignalementCoordinatesType;
    declare selectedDangerItems: SignalementDangerItemsEnum[];
    declare createdAt?: Date;
    declare updatedAt?: Date;
    declare upVote: number;
    declare downVote: number;
    declare userVotedList: string[];

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
        validate: {
            isValidCoordinates(value: SignalementCoordinatesType) {
                if (!value || typeof value !== 'object') throw new ValidationError('Invalid coordinates', []);
                if (!value.latitude || isNaN(Number(value.latitude))) throw new ValidationError('Invalid latitude', []);
                if (!value.longitude || isNaN(Number(value.longitude))) throw new ValidationError('Invalid longitude', []);
                if (value.latitude < -90 || value.latitude > 90) throw new ValidationError('Invalid latitude', []);
                if (value.longitude < -180 || value.longitude > 180) throw new ValidationError('Invalid longitude', []);
            }
        },
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
    },
    upVote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    downVote: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    userVotedList: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: []
    }
}, {
    sequelize,
    modelName: 'Signalement',
    tableName: 'signalements',
});

export default Signalement;
