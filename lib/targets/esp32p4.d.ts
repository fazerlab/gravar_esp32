import { ESPLoader } from "../esploader.js";
import { ESP32ROM } from "./esp32.js";
export declare class ESP32P4ROM extends ESP32ROM {
    CHIP_NAME: string;
    IMAGE_CHIP_ID: number;
    IROM_MAP_START: number;
    IROM_MAP_END: number;
    DROM_MAP_START: number;
    DROM_MAP_END: number;
    BOOTLOADER_FLASH_OFFSET: number;
    CHIP_DETECT_MAGIC_VALUE: number[];
    UART_DATE_REG_ADDR: number;
    EFUSE_BASE: number;
    EFUSE_BLOCK1_ADDR: number;
    MAC_EFUSE_REG: number;
    SPI_REG_BASE: number;
    SPI_USR_OFFS: number;
    SPI_USR1_OFFS: number;
    SPI_USR2_OFFS: number;
    SPI_MOSI_DLEN_OFFS: number;
    SPI_MISO_DLEN_OFFS: number;
    SPI_W0_OFFS: number;
    EFUSE_RD_REG_BASE: number;
    EFUSE_PURPOSE_KEY0_REG: number;
    EFUSE_PURPOSE_KEY0_SHIFT: number;
    EFUSE_PURPOSE_KEY1_REG: number;
    EFUSE_PURPOSE_KEY1_SHIFT: number;
    EFUSE_PURPOSE_KEY2_REG: number;
    EFUSE_PURPOSE_KEY2_SHIFT: number;
    EFUSE_PURPOSE_KEY3_REG: number;
    EFUSE_PURPOSE_KEY3_SHIFT: number;
    EFUSE_PURPOSE_KEY4_REG: number;
    EFUSE_PURPOSE_KEY4_SHIFT: number;
    EFUSE_PURPOSE_KEY5_REG: number;
    EFUSE_PURPOSE_KEY5_SHIFT: number;
    EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG: number;
    EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT: number;
    EFUSE_SPI_BOOT_CRYPT_CNT_REG: number;
    EFUSE_SPI_BOOT_CRYPT_CNT_MASK: number;
    EFUSE_SECURE_BOOT_EN_REG: number;
    EFUSE_SECURE_BOOT_EN_MASK: number;
    PURPOSE_VAL_XTS_AES256_KEY_1: number;
    PURPOSE_VAL_XTS_AES256_KEY_2: number;
    PURPOSE_VAL_XTS_AES128_KEY: number;
    SUPPORTS_ENCRYPTED_FLASH: boolean;
    FLASH_ENCRYPTED_WRITE_ALIGN: number;
    MEMORY_MAP: (string | number)[][];
    UF2_FAMILY_ID: number;
    EFUSE_MAX_KEY: number;
    KEY_PURPOSES: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
    };
    TEXT_START: number;
    ENTRY: number;
    DATA_START: number;
    ROM_DATA: string;
    ROM_TEXT: string;
    getPkgVersion(loader: ESPLoader): Promise<number>;
    getMinorChipVersion(loader: ESPLoader): Promise<number>;
    getMajorChipVersion(loader: ESPLoader): Promise<number>;
    getChipDescription(loader: ESPLoader): Promise<string>;
    getChipFeatures(loader: ESPLoader): Promise<string[]>;
    getCrystalFreq(loader: ESPLoader): Promise<number>;
    getFlashVoltage(loader: ESPLoader): Promise<void>;
    overrideVddsdio(loader: ESPLoader): Promise<void>;
    readMac(loader: ESPLoader): Promise<string>;
    getFlashCryptConfig(loader: ESPLoader): Promise<void>;
    getSecureBootEnabled(laoder: ESPLoader): Promise<number>;
    getKeyBlockPurpose(loader: ESPLoader, keyBlock: number): Promise<number | undefined>;
    isFlashEncryptionKeyValid(loader: ESPLoader): Promise<boolean>;
}