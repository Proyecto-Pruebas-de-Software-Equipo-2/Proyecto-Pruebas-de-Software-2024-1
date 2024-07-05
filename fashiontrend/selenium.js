const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');

async function crearProductoTestError() {
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    try {
        // Navegar a la página de creación de productos
        await driver.get('http://localhost:3000/producto/crear');

        // Completar el formulario correctamente
        await driver.findElement(By.css('input[placeholder="Ingrese Nombre"]')).sendKeys('Producto de prueba');
        await driver.findElement(By.css('input[placeholder="Ingrese Talla"]')).sendKeys('M');
        await driver.findElement(By.css('textarea[placeholder="Ingrese Descripción"]')).sendKeys('Descripción de prueba');
        await driver.findElement(By.css('input[placeholder="Ingrese Categoría"]')).sendKeys('Categoría de prueba');
        await driver.findElement(By.css('input[placeholder="Ingrese Tipo"]')).sendKeys('Tipo de prueba');
        // Hacer clic en el botón de enviar sin completar todos los campos
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        await driver.sleep(3000);

        // Esperar a que aparezca el mensaje de error
        let toastMessage = await waitForErrorToast(driver, 10000);
        // Verificar si el mensaje de error fue encontrado y obtener su texto
        let text = await toastMessage.getText();
        assert.strictEqual(text.trim(), 'Debe llenar todos los campos', 'El mensaje de error no apareció correctamente.');

        console.log('Prueba de creación de producto (sin todos los campos) exitosa.');

    } catch (error) {
        console.error('Prueba de creación de producto (sin todos los campos) fallida:', error);
    } finally {
        await driver.quit();
    }
}

async function crearProductoTest() {
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    try {
        // Navegar a la página de creación de productos
        await driver.get('http://localhost:3000/producto/crear');

        // Completar el formulario correctamente
        await driver.findElement(By.css('input[placeholder="Ingrese Nombre"]')).sendKeys('Producto de prueba');
        await driver.findElement(By.css('input[placeholder="Ingrese Talla"]')).sendKeys('M');
        await driver.findElement(By.css('textarea[placeholder="Ingrese Descripción"]')).sendKeys('Descripción de prueba');
        await driver.findElement(By.css('input[placeholder="Ingrese Color"]')).sendKeys('Azul');
        await driver.findElement(By.css('input[placeholder="Ingrese Categoría"]')).sendKeys('Categoría de prueba');
        await driver.findElement(By.css('input[placeholder="Ingrese Tipo"]')).sendKeys('Tipo de prueba');
        await driver.findElement(By.css('input[placeholder="Ingrese Precio"]')).sendKeys('100');
        await driver.findElement(By.css('input[placeholder="Ingrese Stock"]')).sendKeys('10');

        // Enviar el formulario
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Esperar hasta 10 segundos para que aparezca el mensaje de éxito
        let toastMessage = await waitForSuccessToast(driver, 10000);

        // Verificar si el mensaje de éxito fue encontrado y obtener su texto
        let text = await toastMessage.getText();
        assert.strictEqual(text.trim(), 'Producto creado exitosamente', 'El mensaje de éxito no apareció correctamente.');

        console.log('Prueba de creación de producto exitosa.');

    } catch (error) {
        console.error('Prueba de creación de producto fallida:', error);
    } finally {
        await driver.quit();
    }
}

async function waitForSuccessToast(driver, timeout) {
    let toastMessage = null;
    const startTime = new Date().getTime();
    const endTime = startTime + timeout;

    while (new Date().getTime() <= endTime) {
        try {
            // Intentar encontrar el elemento que contiene el mensaje de éxito usando un XPath específico
            toastMessage = await driver.findElement(By.xpath(`//div[contains(@class, 'Toastify__toast--success')]//div[contains(@class, 'Toastify__toast-body')]//div[text()='Producto creado exitosamente']`));
            if (toastMessage) break; // Si se encuentra, salir del bucle
        } catch (error) {
            // Si no se encuentra, esperar un breve período antes de intentar nuevamente
            await driver.sleep(1000); // Pausa de 1 segundo
        }
    }

    if (!toastMessage) {
        throw new Error('El mensaje de éxito no se encontró después del tiempo de espera.');
    }

    return toastMessage;
}

async function waitForErrorToast(driver, timeout) {
    let toastMessage = null;
    const startTime = new Date().getTime();
    const endTime = startTime + timeout;

    while (new Date().getTime() <= endTime) {
        try {
            // Intentar encontrar el elemento que contiene el mensaje de error usando un XPath específico
            toastMessage = await driver.findElement(By.xpath(`//div[contains(@class, 'Toastify__toast--error')]//div[@role='alert']//div[contains(text(), 'Debe llenar todos los campos')]`));
            if (toastMessage) break; // Si se encuentra, salir del bucle
        } catch (error) {
            // Si no se encuentra, esperar un breve período antes de intentar nuevamente
            await driver.sleep(1000); // Pausa de 1 segundo
        }
    }

    if (!toastMessage) {
        throw new Error('El mensaje de error no se encontró después del tiempo de espera.');
    }

    return toastMessage;
}

// Llamar a las dos pruebas secuencialmente
crearProductoTestError();
crearProductoTest();
