import { ScanResolver } from './scan';

// ------------------------
describe('Scanning sales tests', () => {

    it('returns null if product not found', async () => {
        const result = await (ScanResolver as any).sale(
            14,
            'fake-barcode'
        );
        console.log("🚀 ~ result", result);

        await expect(result).resolves.toEqual(null);
    });
});