const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

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
        let toastMessage = await waitForToastMessage(driver, 'error', 'Debe llenar todos los campos', 10000);

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
        await driver.findElement(By.css('input[placeholder="Ingrese Nombre"]')).sendKeys('Prueba Selenium');
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
        let toastMessage = await waitForToastMessage(driver, 'success', 'Producto creado exitosamente', 10000);

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

async function modificarProductoCorrecto() {
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Navegar a la página de listado de productos
        await driver.get('http://localhost:3000/producto/listado');

        // Esperar a que la paginación esté presente y sea visible
        await driver.wait(until.elementLocated(By.xpath("//nav[@aria-label='Pagination']")), 10000);

        // Ciclo para hacer clic en el botón de siguiente hasta que esté deshabilitado
        while (true) {
            let nextButton = await driver.findElement(By.xpath("//button[contains(., 'Next')]"));
            if (await nextButton.getAttribute("disabled")) {
                break; // Salir del bucle si el botón de siguiente está deshabilitado
            }
            await nextButton.click();
        }

        // Encontrar el elemento que contiene "Prueba Selenium"
        let productoElement = await driver.findElement(By.xpath("//h3[contains(text(), 'Prueba Selenium')]"));

        let editarBoton = await productoElement.findElement(By.xpath("//a[text()='Editar']"));
        await editarBoton.click();

        // Esperar a que el formulario esté presente y sea visible
        await driver.wait(until.elementLocated(By.css("form[class*='max-w-sm']")), 10000);

        // Simular el llenado del formulario y vaciar los campos
        await clearAndType(driver, await driver.findElement(By.name('talla')), 'Nueva Talla');
        await clearAndType(driver, await driver.findElement(By.name('descripcion')), 'Nueva desc');

        await driver.sleep(3000); // Pausa de 1 segundo

        // Enviar el formulario
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Esperar hasta 10 segundos para que aparezca el mensaje de éxito
        let toastMessage = await waitForToastMessage(driver, 'success', 'Producto editado exitosamente!', 10000);

        // Verificar si el mensaje de éxito fue encontrado y obtener su texto
        let text = await toastMessage.getText();
        assert.strictEqual(text.trim(), 'Producto editado exitosamente!', 'El mensaje de éxito no apareció correctamente.');

        console.log('Prueba de edición de producto exitosa.');
    } catch (error) {
        console.error('Error al modificar el producto:', error);
    } finally {
        // Cerrar el navegador al finalizar
        await driver.quit();
    }
}


async function borrarProducto() {
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Navegar a la página de listado de productos
        await driver.get('http://localhost:3000/producto/listado');

        // Esperar a que la paginación esté presente y sea visible
        await driver.wait(until.elementLocated(By.xpath("//nav[@aria-label='Pagination']")), 10000);

        // Ciclo para hacer clic en el botón de siguiente hasta que esté deshabilitado
        while (true) {
            let nextButton = await driver.findElement(By.xpath("//button[contains(., 'Next')]"));
            if (await nextButton.getAttribute("disabled")) {
                break; // Salir del bucle si el botón de siguiente está deshabilitado
            }
            await nextButton.click();
        }

        // Encontrar el elemento que contiene "Prueba Selenium"
        let productoElement = await driver.findElement(By.xpath("//h3[contains(text(), 'Prueba Selenium')]"));
        let borrarBoton = await productoElement.findElement(By.xpath("//button[text()='Eliminar Producto']"));
        await borrarBoton.click();

        // Esperar hasta 10 segundos para que aparezca el mensaje de éxito
        let toastMessage = await waitForToastMessage(driver, 'success', 'Producto eliminado exitosamente', 10000);

        // Verificar si el mensaje de éxito fue encontrado y obtener su texto
        let text = await toastMessage.getText();
        assert.strictEqual(text.trim(), 'Producto eliminado exitosamente', 'El mensaje de éxito no apareció correctamente.');

        console.log('Prueba de eliminacion de producto exitosa.');
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    } finally {
        // Cerrar el navegador al finalizar
        await driver.quit();
    }
}


async function modificarProductoError() {
    let options = new chrome.Options();
    options.addArguments('headless');
    options.addArguments('no-sandbox');
    options.addArguments('disable-dev-shm-usage');

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Navegar a la página de listado de productos
        await driver.get('http://localhost:3000/producto/listado');

        // Esperar a que la paginación esté presente y sea visible
        await driver.wait(until.elementLocated(By.xpath("//nav[@aria-label='Pagination']")), 10000);

        // Ciclo para hacer clic en el botón de siguiente hasta que esté deshabilitado
        while (true) {
            let nextButton = await driver.findElement(By.xpath("//button[contains(., 'Next')]"));
            if (await nextButton.getAttribute("disabled")) {
                break; // Salir del bucle si el botón de siguiente está deshabilitado
            }
            await nextButton.click();
        }

        // Encontrar el elemento que contiene "Prueba Selenium"
        let productoElement = await driver.findElement(By.xpath("//h3[contains(text(), 'Prueba Selenium')]"));

        let editarBoton = await productoElement.findElement(By.xpath("//a[text()='Editar']"));
        await editarBoton.click();

        // Esperar a que el formulario esté presente y sea visible
        await driver.wait(until.elementLocated(By.css("form[class*='max-w-sm']")), 10000);

        // Simular el llenado del formulario y vaciar los campos
        await clearAndType(driver, await driver.findElement(By.name('nombre')), '');
        await clearAndType(driver, await driver.findElement(By.name('talla')), '');
        await clearAndType(driver, await driver.findElement(By.name('descripcion')), '');
        await clearAndType(driver, await driver.findElement(By.name('color')), '');
        await clearAndType(driver, await driver.findElement(By.name('categoria')), '');
        await clearAndType(driver, await driver.findElement(By.name('tipo')), '');
        await clearAndType(driver, await driver.findElement(By.name('precio')), '');
        await clearAndType(driver, await driver.findElement(By.name('stock')), '');

        // Enviar el formulario
        await driver.findElement(By.css('button[type="submit"]')).click();

        await driver.sleep(2000); // Pausa de 1 segundo
        // Esperar hasta 10 segundos para que aparezca el mensaje de error
        let toastMessage = await waitForToastMessage(driver, 'error', 'Debe llenar todos los campos', 10000);

        // Verificar si el mensaje de éxito fue encontrado y obtener su texto
        let text = await toastMessage.getText();
        assert.strictEqual(text.trim(), 'Debe llenar todos los campos', 'El mensaje de error apareció correctamente.');

        console.log('Prueba de edición de producto (con campos vacíos) exitosa.');
    } catch (error) {
        console.error('Error al modificar el producto:', error);
    } finally {
        // Cerrar el navegador al finalizar
        await driver.quit();
    }
}

async function clearAndType(driver, element, text) {
    // Clear the field by sending multiple BACK_SPACE keys
    // Esperar a que el elemento sea visible y sea interactuable
    await element.isDisplayed();
    await element.isEnabled();
    let currentValue = await element.getAttribute('value');
    let backspaces = currentValue.split('').map(() => Key.BACK_SPACE).join('');
    await element.sendKeys(backspaces);

    // Now send the new text
    await element.sendKeys(text);
}


async function waitForToastMessage(driver, toastType, message, timeout) {
    let toastMessage = null;
    const startTime = new Date().getTime();
    const endTime = startTime + timeout;

    while (new Date().getTime() <= endTime) {
        try {
            // Intentar encontrar el elemento que contiene el mensaje de tostada utilizando un XPath específico
            toastMessage = await driver.findElement(By.xpath(`//div[contains(@class, 'Toastify__toast--${toastType}')]//div[@role='alert']//div[contains(text(), '${message}')]`));
            if (toastMessage) break; // Si se encuentra, salir del bucle
        } catch (error) {
            // Si no se encuentra, esperar un breve período antes de intentar nuevamente
            await driver.sleep(1000); // Pausa de 1 segundo
        }
    }

    if (!toastMessage) {
        throw new Error(`El mensaje de ${toastType} '${message}' no se encontró después del tiempo de espera.`);
    }

    return toastMessage;
}

// Ejecutar las pruebas en orden secuencial
async function ejecutarPruebasSecuenciales() {
    // Llamar a las dos pruebas secuencialmente
    await crearProductoTestError();
    await crearProductoTest();
    await modificarProductoError();
    await modificarProductoCorrecto();
    await borrarProducto();
}

ejecutarPruebasSecuenciales();







