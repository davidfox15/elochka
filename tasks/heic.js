const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const convert = require("heic-convert");

async function deleteMatchingFiles(
  heicDir = "src/heic",
  imagesDir = "src/images",
) {
  try {
    // Получаем список файлов из папки heic
    const files = await fs.promises.readdir(heicDir);

    // Фильтруем только HEIC-файлы
    const heicFiles = files.filter((file) =>
      file.toLowerCase().endsWith(".heic"),
    );

    if (heicFiles.length === 0) {
      console.log("HEIC-файлы не найдены в папке:", heicDir);
      return;
    }

    // Перебираем HEIC-файлы
    for (const file of heicFiles) {
      const fileNameWithoutExt = file.replace(/\.heic$/i, "");
      const targetPath = path.join(imagesDir, `${fileNameWithoutExt}.jpg`);

      try {
        // Проверяем, существует ли файл в папке images
        await fs.promises.access(targetPath);
        // Удаляем файл
        await fs.promises.unlink(targetPath);
        console.log(`Удален: ${fileNameWithoutExt}.jpg`);
      } catch (error) {
        // Если файл не существует, пропускаем
        if (error.code === "ENOENT") {
          console.log(
            `Файл ${fileNameWithoutExt}.jpg не найден в ${imagesDir}`,
          );
        } else {
          console.error(
            `Ошибка при удалении ${fileNameWithoutExt}.jpg:`,
            error.message,
          );
        }
      }
    }

    return heicFiles;
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

async function convertHEIC() {
  const files = await deleteMatchingFiles();
  try {
    for (const file of files) {
      const inputBuffer = await promisify(fs.readFile)(`src/heic/${file}`);
      const outputBuffer = await convert({
        buffer: inputBuffer, // the HEIC file buffer
        format: "JPEG", // output format
        quality: 1, // the jpeg compression quality, between 0 and 1
      });
      const resultName = file.toLowerCase().replace(/\.heic$/i, "");
      await promisify(fs.writeFile)(
        `src/images/${resultName}.jpg`,
        outputBuffer,
      );
      console.log(`Конвертирован: ${file} в ${resultName}.jpg`);
    }
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

module.exports = convertHEIC;
