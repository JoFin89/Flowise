import features from '@/data/features.fr.json';
import enneagram from '@/data/enneagram.fr.v1_1.json';
import { enneagramSchema, featureSchema } from '@/lib/schemas';

export const featuresData = featureSchema.parse(features);
export const enneagramData = enneagramSchema.parse(enneagram);
