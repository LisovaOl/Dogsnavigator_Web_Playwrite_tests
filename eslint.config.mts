/**
 * ESLint конфігурація для Playwright тестового проекту
 * Використовує ESLint 9 flat config формат
 *
 * Документація:
 * - ESLint: https://eslint.org/docs/latest/
 * - TypeScript-ESLint: https://typescript-eslint.io/
 * - Playwright ESLint Plugin: https://github.com/playwright-community/eslint-plugin-playwright
 * - Prettier: https://prettier.io/docs/en/
 */

import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // ============================================
  // Базові правила ESLint для JavaScript
  // Включає рекомендовані правила: no-unused-vars, no-undef, тощо
  // ============================================
  js.configs.recommended,

  // ============================================
  // Правила TypeScript-ESLint
  // Додає підтримку TypeScript синтаксису та типізації
  // ============================================
  ...tseslint.configs.recommended,

  // ============================================
  // Prettier - вимикає ESLint правила що конфліктують з Prettier
  // Має бути після інших конфігів щоб перезаписати конфліктуючі правила
  // ============================================
  prettierConfig,

  // ============================================
  // Глобальні виключення
  // Ці папки не будуть перевірятися ESLint
  // ============================================
  {
    ignores: [
      "playwright-report/**", // HTML звіти Playwright
      "node_modules/**", // Залежності npm
      "test-results/**", // Результати тестів (скріншоти, відео)
      "dist/**", // Скомпільований код
      ".git/**", // Git файли
    ],
  },

  // ============================================
  // Конфігурація для TypeScript файлів
  // Застосовується до всіх .ts, .mts, .cts файлів
  // ============================================
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: {
      prettier, // Prettier плагін для показу помилок форматування
    },
    languageOptions: {
      ecmaVersion: "latest", // Використовувати найновіший ECMAScript
      sourceType: "module", // ES модулі (import/export)
      globals: {
        ...globals.node, // Node.js глобальні змінні (process, __dirname, тощо)
        ...globals.browser, // Браузерні глобальні змінні (window, document, тощо)
      },
      parserOptions: {
        project: "./tsconfig.json", // Шлях до TypeScript конфігурації
      },
    },
    rules: {
      // === Prettier ===
      // Показує помилки форматування як ESLint попередження
      "prettier/prettier": "warn",

      // === TypeScript правила ===

      // Попередження про невикористані змінні, ігноруючи ті що починаються з "_"
      // Приклад: const _unusedVar = 1; - не викличе попередження
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Попередження при використанні типу "any"
      // Краще використовувати конкретні типи для кращої типобезпеки
      "@typescript-eslint/no-explicit-any": "warn",

      // Вимкнено: не вимагати явного типу повернення функцій
      // TypeScript сам може вивести тип
      "@typescript-eslint/explicit-function-return-type": "off",

      // Попередження при використанні оператора "!" (non-null assertion)
      // Приклад: element!.click() - небезпечно, може бути null
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  // ============================================
  // Конфігурація для Playwright тестових файлів
  // Застосовується тільки до *.spec.ts файлів
  // ============================================
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.spec.ts", "specs/**/*.spec.ts"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,

      // Кожен тест повинен мати хоча б один expect()
      // Тест без перевірок - безглуздий
      "playwright/expect-expect": "warn",

      // Попередження при використанні if/else в тестах
      // Тести мають бути детерміновані, без умовної логіки
      "playwright/no-conditional-in-test": "warn",

      // ПОМИЛКА при використанні test.only()
      // Забороняє комітити сфокусовані тести
      "playwright/no-focused-test": "error",

      // Попередження при використанні test.skip()
      // Нагадує, що є пропущені тести
      "playwright/no-skipped-test": "warn",

      // Перевіряє правильність синтаксису expect()
      "playwright/valid-expect": "error",

      // Попередження при використанні page.waitForTimeout()
      // Краще використовувати явні очікування (waitForSelector, тощо)
      "playwright/no-wait-for-timeout": "warn",

      // Попередження при зайвому await
      // Приклад: await expect(locator).toBeVisible() - await не потрібен
      "playwright/no-useless-await": "warn",

      // Рекомендує використовувати web-first assertions
      // Приклад: expect(locator).toHaveText() замість expect(await locator.textContent()).toBe()
      "playwright/prefer-web-first-assertions": "warn",

      // ПОМИЛКА при використанні waitForLoadState("networkidle")
      // Застарілий підхід, ненадійний для сучасних SPA
      "playwright/no-networkidle": "error",
    },
  },
);




// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import playwright from "eslint-plugin-playwright";
// import prettier from "eslint-plugin-prettier";
// import prettierConfig from "eslint-config-prettier";

// export default tseslint.config(
//   js.configs.recommended,
//   ...tseslint.configs.recommended,
//   prettierConfig,
//   {
//     ignores: ["node_modules/**", "playwright-report/**", "test-results/**"]
//   },
//   {
//     files: ["**/*.{ts,tsx}"],
//     plugins: { prettier },
//     languageOptions: {
//       globals: {
//         ...globals.node,
//         ...globals.browser
//       }
//     },
//     rules: {
//       "prettier/prettier": "warn",
//       "@typescript-eslint/no-unused-vars": "warn"
//     }
//   },
//   {
//     ...playwright.configs["flat/recommended"],
//     files: ["**/*.spec.ts"]
//   }
// );