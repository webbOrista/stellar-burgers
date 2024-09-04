const ingredientInfoModal = 'Детали ингредиента';
const testBunIngredient = 'ingredient-1';
const testMainIngredient = 'ingredient-2';
const testSauceIngredient = 'ingredient-4';
const topBun = '[data-cy = top-bun-in-constructor]';
const bottomBun = '[data-cy = bottom-bun-in-constructor]';
const burgerConstructor = '[data-cy=burger-constructor]';
const burgerElements = '[data-cy = ingedients-in-constructor]';
const orderNumber = '55555';

describe('Тестирование сценария сборки бургера и оформления заказа', function () {
  beforeEach(function () {
    // Перехват запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  });

  // Команды для переиспользуемых действий
  Cypress.Commands.add('addBun', () => {
    cy.get('[data-cy=buns-as-ingredients]').contains('Добавить').click();
  });

  Cypress.Commands.add('addMainIngredient', () => {
    cy.get('[data-cy=mains-as-ingredients]').contains('Добавить').click();
  });

  Cypress.Commands.add('addSauce', () => {
    cy.get('[data-cy=sauces-as-ingredients]').contains('Добавить').click();
  });

  Cypress.Commands.add('closeModal', () => {
    cy.get('[data-cy=close-modal]').click();
  });

  describe('Функциональность добавления булки и ингредиента в бургер', () => {
    beforeEach(function () {
      cy.visit('/');
    });

    it('При нажатии на кнопку "Добавить" у булки в бургер должна добавиться булка ', () => {
      cy.addBun();

      cy.get(topBun).contains(testBunIngredient).should('exist');
      cy.get(bottomBun).contains(testBunIngredient).should('exist');
    });

    it('При нажатии на кнопку "Добавить" у ингредиента в бургер должен добавиться ингредиент ', () => {
      cy.addMainIngredient();
      cy.addSauce();

      cy.get(burgerElements).contains(testMainIngredient).should('exist');
      cy.get(burgerElements).contains(testSauceIngredient).should('exist');
    });
  });

  describe('Работа модального окна ингредиента', () => {
    beforeEach(function () {
      cy.visit('/');
    });

    it('Открытие модального окна', function () {
      cy.get('div').contains(ingredientInfoModal).should('not.exist');
      cy.get('div').contains(testBunIngredient).click();
      cy.get('div').contains(ingredientInfoModal).should('exist');
      // В модальном окне отображается именно тот ингредиент, по которому кликнули
      cy.get('div').contains(testBunIngredient).should('exist');
    });

    describe('Закрытие модального окна', function () {
      beforeEach(function () {
        cy.get('div').contains('ingredient').click();
        cy.get('div').contains(ingredientInfoModal).should('exist');
      });

      it('Модальное окно закрывается при клике на крестик', function () {
        cy.closeModal();
        cy.get('div').contains(ingredientInfoModal).should('not.exist');
      });

      it('Модальное окно остается открытым при клике внутри него', function () {
        cy.get('div').contains(ingredientInfoModal).click();
        cy.get('div').contains(ingredientInfoModal).should('exist');
      });

      it('Модальное окно закрывается при клике на оверлей', function () {
        // Скрываем элемент перекрывающий оверлей чтобы cypress смог взаимодействовать с ним
        cy.get('[data-cy=modal]').invoke('hide');
        cy.get('[data-cy=modal-overlay]').should('be.visible').click();
        cy.get('div').contains(ingredientInfoModal).should('not.exist');
      });
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(function () {
      // Подстановка моковых токенов для получения возможности оформить заказ
      window.localStorage.setItem(
        'refreshToken',
        JSON.stringify('mockRefreshToken')
      );
      cy.setCookie('accessToken', 'mockAccessToken');

      // Установка разрешения экрана и посещение сайта
      cy.viewport(1300, 800);
      cy.visit('/');
    });

    afterEach(function () {
      window.localStorage.removeItem('refreshToken');
      cy.clearCookies();
    });

    it('Моковые данные пользователя получены', function () {
      cy.get('[data-cy = user]').contains('user-name');
    });

    it('Процесс оформления заказа проиcходит корректно', function () {
      // Сборка бургера
      cy.addBun();
      cy.addMainIngredient();
      cy.addSauce();

      cy.get(topBun).contains(testBunIngredient).should('exist');
      cy.get(bottomBun).contains(testBunIngredient).should('exist');
      cy.get(burgerElements).contains(testMainIngredient).should('exist');
      cy.get(burgerElements).contains(testSauceIngredient).should('exist');

      // Подтверждение заказа, подстановка моковых данных в запрос, проверка корректного отображения номера заказа
      cy.get('[type = button]').contains('Оформить заказ').click();
      cy.get('[data-cy = order-number]').contains(orderNumber).should('exist');

      // Модальное окно успешного оформления заказа закрывается при клике на крестик
      cy.closeModal();
      cy.get('div').contains(orderNumber).should('not.exist');

      // После успешного оформления заказа конструктор очищается

      cy.get(burgerConstructor).contains('Выберите булки').should('exist');
      cy.get(burgerConstructor).contains('Выберите начинку').should('exist');
    });
  });
});
