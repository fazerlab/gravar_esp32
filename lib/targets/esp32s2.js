import { ROM } from "./rom.js";
import ESP32S2_STUB from "./stub_flasher/stub_flasher_32s2.json";
export class ESP32S2ROM extends ROM {
    constructor() {
        super(...arguments);
        this.CHIP_NAME = "ESP32-S2";
        this.IMAGE_CHIP_ID = 2;
        this.MAC_EFUSE_REG = 0x3f41a044;
        this.EFUSE_BASE = 0x3f41a000;
        this.UART_CLKDIV_REG = 0x3f400014;
        this.UART_CLKDIV_MASK = 0xfffff;
        this.UART_DATE_REG_ADDR = 0x60000078;
        this.FLASH_WRITE_SIZE = 0x400;
        this.BOOTLOADER_FLASH_OFFSET = 0x1000;
        this.FLASH_SIZES = {
            "1MB": 0x00,
            "2MB": 0x10,
            "4MB": 0x20,
            "8MB": 0x30,
            "16MB": 0x40,
        };
        this.SPI_REG_BASE = 0x3f402000;
        this.SPI_USR_OFFS = 0x18;
        this.SPI_USR1_OFFS = 0x1c;
        this.SPI_USR2_OFFS = 0x20;
        this.SPI_W0_OFFS = 0x58;
        this.SPI_MOSI_DLEN_OFFS = 0x24;
        this.SPI_MISO_DLEN_OFFS = 0x28;
        this.TEXT_START = ESP32S2_STUB.text_start;
        this.ENTRY = ESP32S2_STUB.entry;
        this.DATA_START = ESP32S2_STUB.data_start;
        this.ROM_DATA = ESP32S2_STUB.data;
        this.ROM_TEXT = ESP32S2_STUB.text;
    }
    async getPkgVersion(loader) {
        const numWord = 3;
        const block1Addr = this.EFUSE_BASE + 0x044;
        const addr = block1Addr + 4 * numWord;
        const word3 = await loader.readReg(addr);
        const pkgVersion = (word3 >> 21) & 0x0f;
        return pkgVersion;
    }
    async getChipDescription(loader) {
        const chipDesc = ["ESP32-S2", "ESP32-S2FH16", "ESP32-S2FH32"];
        const pkgVer = await this.getPkgVersion(loader);
        if (pkgVer >= 0 && pkgVer <= 2) {
            return chipDesc[pkgVer];
        }
        else {
            return "unknown ESP32-S2";
        }
    }
    async getChipFeatures(loader) {
        const features = ["Wi-Fi"];
        const pkgVer = await this.getPkgVersion(loader);
        if (pkgVer == 1) {
            features.push("Embedded 2MB Flash");
        }
        else if (pkgVer == 2) {
            features.push("Embedded 4MB Flash");
        }
        const numWord = 4;
        const block2Addr = this.EFUSE_BASE + 0x05c;
        const addr = block2Addr + 4 * numWord;
        const word4 = await loader.readReg(addr);
        const block2Ver = (word4 >> 4) & 0x07;
        if (block2Ver == 1) {
            features.push("ADC and temperature sensor calibration in BLK2 of efuse");
        }
        return features;
    }
    async getCrystalFreq(loader) {
        return 40;
    }
    _d2h(d) {
        const h = (+d).toString(16);
        return h.length === 1 ? "0" + h : h;
    }
    async readMac(loader) {
        let mac0 = await loader.readReg(this.MAC_EFUSE_REG);
        mac0 = mac0 >>> 0;
        let mac1 = await loader.readReg(this.MAC_EFUSE_REG + 4);
        mac1 = (mac1 >>> 0) & 0x0000ffff;
        const mac = new Uint8Array(6);
        mac[0] = (mac1 >> 8) & 0xff;
        mac[1] = mac1 & 0xff;
        mac[2] = (mac0 >> 24) & 0xff;
        mac[3] = (mac0 >> 16) & 0xff;
        mac[4] = (mac0 >> 8) & 0xff;
        mac[5] = mac0 & 0xff;
        return (this._d2h(mac[0]) +
            ":" +
            this._d2h(mac[1]) +
            ":" +
            this._d2h(mac[2]) +
            ":" +
            this._d2h(mac[3]) +
            ":" +
            this._d2h(mac[4]) +
            ":" +
            this._d2h(mac[5]));
    }
    getEraseSize(offset, size) {
        return size;
    }
}
