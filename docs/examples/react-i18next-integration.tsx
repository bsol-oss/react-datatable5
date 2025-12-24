/**
 * react-i18next Integration Example
 *
 * This file demonstrates how to integrate @bsol-oss/react-datatable5
 * with react-i18next for internationalization.
 *
 * The library no longer includes react-i18next as a dependency, but you can
 * easily integrate it in your consuming application using the patterns shown here.
 */

import { useTranslation } from 'react-i18next';
import { useMemo, useEffect, useState } from 'react';
import {
  DefaultForm,
  IdPickerLabels,
  DateTimePickerLabels,
  EnumPickerLabels,
  FilePickerLabels,
  FormButtonLabels,
  TimePickerLabels,
} from '@bsol-oss/react-datatable5';
import { useForm } from '@bsol-oss/react-datatable5';
import { JSONSchema7 } from 'json-schema';

// ============================================================================
// Helper Hooks for Creating Label Objects from i18n
// ============================================================================

/**
 * Hook to create IdPicker labels from i18n translations
 *
 * @param fieldKey - The base translation key for the field (e.g., 'user', 'product')
 * @returns IdPickerLabels object with translated strings
 */
export function useIdPickerLabels(fieldKey: string): IdPickerLabels {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      undefined: t(`${fieldKey}.undefined`, { defaultValue: 'Not found' }),
      addMore: t(`${fieldKey}.add_more`, { defaultValue: 'Add more' }),
      typeToSearch: t(`${fieldKey}.type_to_search`, {
        defaultValue: 'Type to search...',
      }),
      total: t(`${fieldKey}.total`, { defaultValue: 'Total' }),
      showing: t(`${fieldKey}.showing`, { defaultValue: 'Showing' }),
      perPage: t(`${fieldKey}.per_page`, { defaultValue: 'per page' }),
      emptySearchResult: t(`${fieldKey}.empty_search_result`, {
        defaultValue: 'No results found',
      }),
      initialResults: t(`${fieldKey}.initial_results`, {
        defaultValue: 'Start typing to search',
      }),
    }),
    [t, fieldKey]
  );
}

/**
 * Hook to create DateTimePicker labels from i18n translations
 *
 * @param namespace - The translation namespace (e.g., 'date', 'common')
 * @returns DateTimePickerLabels object with translated strings
 */
export function useDateTimePickerLabels(
  namespace: string = 'date'
): DateTimePickerLabels {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      monthNamesShort: [
        t(`${namespace}.month_1`, { defaultValue: 'Jan' }),
        t(`${namespace}.month_2`, { defaultValue: 'Feb' }),
        t(`${namespace}.month_3`, { defaultValue: 'Mar' }),
        t(`${namespace}.month_4`, { defaultValue: 'Apr' }),
        t(`${namespace}.month_5`, { defaultValue: 'May' }),
        t(`${namespace}.month_6`, { defaultValue: 'Jun' }),
        t(`${namespace}.month_7`, { defaultValue: 'Jul' }),
        t(`${namespace}.month_8`, { defaultValue: 'Aug' }),
        t(`${namespace}.month_9`, { defaultValue: 'Sep' }),
        t(`${namespace}.month_10`, { defaultValue: 'Oct' }),
        t(`${namespace}.month_11`, { defaultValue: 'Nov' }),
        t(`${namespace}.month_12`, { defaultValue: 'Dec' }),
      ],
      weekdayNamesShort: [
        t(`${namespace}.weekday_1`, { defaultValue: 'Sun' }),
        t(`${namespace}.weekday_2`, { defaultValue: 'Mon' }),
        t(`${namespace}.weekday_3`, { defaultValue: 'Tue' }),
        t(`${namespace}.weekday_4`, { defaultValue: 'Wed' }),
        t(`${namespace}.weekday_5`, { defaultValue: 'Thu' }),
        t(`${namespace}.weekday_6`, { defaultValue: 'Fri' }),
        t(`${namespace}.weekday_7`, { defaultValue: 'Sat' }),
      ],
      backButtonLabel: t(`${namespace}.back_button`, {
        defaultValue: 'Previous',
      }),
      forwardButtonLabel: t(`${namespace}.forward_button`, {
        defaultValue: 'Next',
      }),
    }),
    [t, namespace]
  );
}

/**
 * Hook to create EnumPicker labels from i18n translations
 *
 * @param fieldKey - The base translation key for the field
 * @returns EnumPickerLabels object with translated strings
 */
export function useEnumPickerLabels(fieldKey: string): EnumPickerLabels {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      undefined: t(`${fieldKey}.undefined`, { defaultValue: 'Not selected' }),
      addMore: t(`${fieldKey}.add_more`, { defaultValue: 'Add more' }),
      typeToSearch: t(`${fieldKey}.type_to_search`, {
        defaultValue: 'Type to search...',
      }),
      total: t(`${fieldKey}.total`, { defaultValue: 'Total' }),
      showing: t(`${fieldKey}.showing`, { defaultValue: 'Showing' }),
      perPage: t(`${fieldKey}.per_page`, { defaultValue: 'per page' }),
      emptySearchResult: t(`${fieldKey}.empty_search_result`, {
        defaultValue: 'No results found',
      }),
      initialResults: t(`${fieldKey}.initial_results`, {
        defaultValue: 'Start typing to search',
      }),
    }),
    [t, fieldKey]
  );
}

/**
 * Hook to create FilePicker labels from i18n translations
 *
 * @param namespace - The translation namespace (e.g., 'file', 'common')
 * @returns FilePickerLabels object with translated strings
 */
export function useFilePickerLabels(
  namespace: string = 'file'
): FilePickerLabels {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      fileDropzone: t(`${namespace}.file_dropzone`, {
        defaultValue: 'Drop files here or click to browse',
      }),
      browseLibrary: t(`${namespace}.browse_library`, {
        defaultValue: 'Browse Library',
      }),
      dialogTitle: t(`${namespace}.dialog_title`, {
        defaultValue: 'Select File',
      }),
      searchPlaceholder: t(`${namespace}.search_placeholder`, {
        defaultValue: 'Search files...',
      }),
      loading: t(`${namespace}.loading`, { defaultValue: 'Loading...' }),
      loadingFailed: t(`${namespace}.loading_failed`, {
        defaultValue: 'Failed to load files',
      }),
      noFilesFound: t(`${namespace}.no_files_found`, {
        defaultValue: 'No files found',
      }),
      cancel: t(`${namespace}.cancel`, { defaultValue: 'Cancel' }),
      select: t(`${namespace}.select`, { defaultValue: 'Select' }),
      uploadTab: t(`${namespace}.upload_tab`, { defaultValue: 'Upload' }),
      browseTab: t(`${namespace}.browse_tab`, { defaultValue: 'Browse' }),
      uploading: t(`${namespace}.uploading`, { defaultValue: 'Uploading...' }),
      uploadFailed: t(`${namespace}.upload_failed`, {
        defaultValue: 'Upload failed',
      }),
    }),
    [t, namespace]
  );
}

/**
 * Hook to create FormButton labels from i18n translations
 *
 * @param namespace - The translation namespace (e.g., 'form', 'common')
 * @returns FormButtonLabels object with translated strings
 */
export function useFormButtonLabels(
  namespace: string = 'form'
): FormButtonLabels {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      submit: t(`${namespace}.submit`, { defaultValue: 'Submit' }),
      reset: t(`${namespace}.reset`, { defaultValue: 'Reset' }),
      cancel: t(`${namespace}.cancel`, { defaultValue: 'Cancel' }),
      confirm: t(`${namespace}.confirm`, { defaultValue: 'Confirm' }),
      submitAgain: t(`${namespace}.submit_again`, {
        defaultValue: 'Submit Again',
      }),
      submitSuccess: t(`${namespace}.submit_success`, {
        defaultValue: 'Success!',
      }),
      add: t(`${namespace}.add`, { defaultValue: 'Add' }),
      save: t(`${namespace}.save`, { defaultValue: 'Save' }),
      addNew: t(`${namespace}.add_new`, { defaultValue: 'Add New' }),
      fieldRequired: t(`${namespace}.field_required`, {
        defaultValue: 'Required',
      }),
    }),
    [t, namespace]
  );
}

/**
 * Hook to create TimePicker labels from i18n translations
 *
 * @param fieldKey - The base translation key for the field
 * @returns TimePickerLabels object with translated strings
 */
export function useTimePickerLabels(fieldKey: string): TimePickerLabels {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      placeholder: t(`${fieldKey}.placeholder`, {
        defaultValue: 'Select time',
      }),
      emptyMessage: t(`${fieldKey}.empty_message`, {
        defaultValue: 'No time selected',
      }),
    }),
    [t, fieldKey]
  );
}

// ============================================================================
// Complete Example: Form with i18n Integration
// ============================================================================

/**
 * Example: User Registration Form with i18n
 *
 * This example shows how to use all the helper hooks together
 * to create a fully internationalized form.
 */
export function UserRegistrationForm() {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const form = useForm({});

  // Create all label objects using helper hooks
  const idPickerLabels = useIdPickerLabels('user');
  const dateTimePickerLabels = useDateTimePickerLabels('date');
  const enumPickerLabels = useEnumPickerLabels('status');
  const filePickerLabels = useFilePickerLabels('file');
  const formButtonLabels = useFormButtonLabels('form');
  const timePickerLabels = useTimePickerLabels('time');

  // Update language state when i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  // Create schema with translated field labels and error messages
  const schema: JSONSchema7 = useMemo(
    () => ({
      type: 'object',
      title: t('form.title', { defaultValue: 'User Registration' }),
      required: ['username', 'email', 'birthDate'],
      properties: {
        username: {
          type: 'string',
          title: t('user.username.label', { defaultValue: 'Username' }),
          minLength: 3,
          maxLength: 20,
          errorMessages: {
            required: t('user.username.required', {
              defaultValue: 'Username is required',
            }),
            minLength: t('user.username.min_length', {
              defaultValue: 'Username must be at least 3 characters',
            }),
            maxLength: t('user.username.max_length', {
              defaultValue: 'Username must be at most 20 characters',
            }),
          },
        },
        email: {
          type: 'string',
          format: 'email',
          title: t('user.email.label', { defaultValue: 'Email' }),
          errorMessages: {
            required: t('user.email.required', {
              defaultValue: 'Email is required',
            }),
            format: t('user.email.invalid', {
              defaultValue: 'Invalid email format',
            }),
          },
        },
        birthDate: {
          type: 'string',
          format: 'date',
          title: t('user.birth_date.label', { defaultValue: 'Birth Date' }),
          variant: 'date-picker',
          errorMessages: {
            required: t('user.birth_date.required', {
              defaultValue: 'Birth date is required',
            }),
          },
        },
        manager: {
          type: 'string',
          title: t('user.manager.label', { defaultValue: 'Manager' }),
          variant: 'id-picker',
          foreign_key: {
            table: 'users',
            column: 'id',
            // customQueryFn: ... your query function
          },
        },
        status: {
          type: 'string',
          title: t('user.status.label', { defaultValue: 'Status' }),
          variant: 'enum-picker',
          enum: ['active', 'inactive', 'pending'],
          errorMessages: {
            required: t('user.status.required', {
              defaultValue: 'Status is required',
            }),
          },
        },
        avatar: {
          type: 'string',
          title: t('user.avatar.label', { defaultValue: 'Avatar' }),
          variant: 'file-picker',
        },
      },
    }),
    [t, currentLang] // Re-create schema when language changes
  );

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'https://api.example.com/users',
        onSubmit: async (data) => {
          console.log('Form submitted:', data);
          // Handle submission
        },
        // Pass all label objects
        idPickerLabels,
        dateTimePickerLabels,
        enumPickerLabels,
        filePickerLabels,
        formButtonLabels,
        timePickerLabels,
        ...form,
      }}
    />
  );
}

// ============================================================================
// Example: Language Switcher Component
// ============================================================================

/**
 * Example: Language Switcher
 *
 * Shows how to create a language switcher that updates
 * all form labels when language changes.
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('zh-HK')}>繁體中文</button>
      <button onClick={() => changeLanguage('zh-CN')}>简体中文</button>
    </div>
  );
}

// ============================================================================
// Example: Simplified Usage (Single Field)
// ============================================================================

/**
 * Example: Simple Form with Single IdPicker Field
 *
 * Minimal example showing how to use i18n with a single field.
 */
export function SimpleUserPicker() {
  const { t } = useTranslation();
  const form = useForm({});

  // Create labels for the user picker
  const idPickerLabels: IdPickerLabels = {
    undefined: t('user.undefined', { defaultValue: 'User not found' }),
    addMore: t('user.add_more', { defaultValue: 'Add more users' }),
    typeToSearch: t('user.type_to_search', {
      defaultValue: 'Type to search...',
    }),
    total: t('user.total', { defaultValue: 'Total' }),
    showing: t('user.showing', { defaultValue: 'Showing' }),
    perPage: t('user.per_page', { defaultValue: 'per page' }),
    emptySearchResult: t('user.empty_search_result', {
      defaultValue: 'No users found',
    }),
    initialResults: t('user.initial_results', {
      defaultValue: 'Start typing to search',
    }),
  };

  const schema: JSONSchema7 = {
    type: 'object',
    required: ['user'],
    properties: {
      user: {
        type: 'string',
        title: t('user.label', { defaultValue: 'User' }),
        variant: 'id-picker',
        foreign_key: {
          table: 'users',
          column: 'id',
        },
        errorMessages: {
          required: t('user.required', { defaultValue: 'User is required' }),
        },
      },
    },
  };

  return (
    <DefaultForm
      formConfig={{
        schema,
        serverUrl: 'https://api.example.com',
        idPickerLabels,
        ...form,
      }}
    />
  );
}

// ============================================================================
// Example Translation Files Structure
// ============================================================================

/**
 * Example i18n translation files structure:
 *
 * en.json:
 * {
 *   "user": {
 *     "label": "User",
 *     "required": "User is required",
 *     "undefined": "User not found",
 *     "add_more": "Add more users",
 *     "type_to_search": "Type to search users...",
 *     "total": "Total",
 *     "showing": "Showing",
 *     "per_page": "per page",
 *     "empty_search_result": "No users found matching your search",
 *     "initial_results": "Start typing to search for users",
 *     "username": {
 *       "label": "Username",
 *       "required": "Username is required",
 *       "min_length": "Username must be at least 3 characters",
 *       "max_length": "Username must be at most 20 characters"
 *     },
 *     "email": {
 *       "label": "Email",
 *       "required": "Email is required",
 *       "invalid": "Invalid email format"
 *     }
 *   },
 *   "date": {
 *     "month_1": "Jan",
 *     "month_2": "Feb",
 *     "month_3": "Mar",
 *     "month_4": "Apr",
 *     "month_5": "May",
 *     "month_6": "Jun",
 *     "month_7": "Jul",
 *     "month_8": "Aug",
 *     "month_9": "Sep",
 *     "month_10": "Oct",
 *     "month_11": "Nov",
 *     "month_12": "Dec",
 *     "weekday_1": "Sun",
 *     "weekday_2": "Mon",
 *     "weekday_3": "Tue",
 *     "weekday_4": "Wed",
 *     "weekday_5": "Thu",
 *     "weekday_6": "Fri",
 *     "weekday_7": "Sat",
 *     "back_button": "Previous",
 *     "forward_button": "Next"
 *   },
 *   "form": {
 *     "title": "User Registration",
 *     "submit": "Submit",
 *     "reset": "Reset",
 *     "cancel": "Cancel",
 *     "confirm": "Confirm",
 *     "submit_again": "Submit Again",
 *     "submit_success": "Success!",
 *     "add": "Add",
 *     "save": "Save",
 *     "add_new": "Add New",
 *     "field_required": "Required"
 *   },
 *   "file": {
 *     "file_dropzone": "Drop files here or click to browse",
 *     "browse_library": "Browse Library",
 *     "dialog_title": "Select File",
 *     "search_placeholder": "Search files...",
 *     "loading": "Loading...",
 *     "loading_failed": "Failed to load files",
 *     "no_files_found": "No files found",
 *     "cancel": "Cancel",
 *     "select": "Select",
 *     "upload_tab": "Upload",
 *     "browse_tab": "Browse",
 *     "uploading": "Uploading...",
 *     "upload_failed": "Upload failed"
 *   }
 * }
 *
 * zh-HK.json:
 * {
 *   "user": {
 *     "label": "用戶",
 *     "required": "用戶為必填",
 *     "undefined": "找不到用戶",
 *     "add_more": "新增更多用戶",
 *     "type_to_search": "輸入以搜尋用戶...",
 *     "total": "總數",
 *     "showing": "顯示",
 *     "per_page": "每頁",
 *     "empty_search_result": "找不到符合的用戶",
 *     "initial_results": "開始輸入以搜尋用戶"
 *   },
 *   // ... other translations
 * }
 */
