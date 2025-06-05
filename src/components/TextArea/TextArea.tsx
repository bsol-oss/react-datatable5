"use client";

import type React from "react";
import { forwardRef, useRef, useEffect } from "react";
import { Field, Box } from "@chakra-ui/react";

interface CustomTextareaProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  rows?: number;
  maxLength?: number;
  autoFocus?: boolean;
  invalid?: boolean;
  required?: boolean;
  label?: string;
  helperText?: string;
  errorText?: string;
}

const Textarea = forwardRef<HTMLDivElement, CustomTextareaProps>(
  (
    {
      value,
      defaultValue,
      placeholder,
      onChange,
      onFocus,
      onBlur,
      disabled = false,
      readOnly = false,
      className,
      rows = 4,
      maxLength,
      autoFocus = false,
      invalid = false,
      required = false,
      label,
      helperText,
      errorText,
      ...props
    },
    ref
  ) => {
    const contentEditableRef = useRef<HTMLDivElement>(null);
    const isControlled = value !== undefined;

    // Handle input changes
    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      const text = e.currentTarget.textContent || "";
      
      // Check maxLength if specified
      if (maxLength && text.length > maxLength) {
        e.currentTarget.textContent = text.slice(0, maxLength);
        // Move cursor to end
        const selection = window.getSelection();
        if (selection) {
          selection.selectAllChildren(e.currentTarget);
          selection.collapseToEnd();
        }
        return;
      }
      
      onChange?.(text);
    };

    // Handle paste events to strip formatting and respect maxLength
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData('text/plain');
      const currentText = e.currentTarget.textContent || "";
      
      let pasteText = text;
      if (maxLength) {
        const remainingLength = maxLength - currentText.length;
        pasteText = text.slice(0, remainingLength);
      }
      
      document.execCommand('insertText', false, pasteText);
    };

    // Set initial content
    useEffect(() => {
      if (contentEditableRef.current && !isControlled) {
        const initialValue = defaultValue || "";
        if (contentEditableRef.current.textContent !== initialValue) {
          contentEditableRef.current.textContent = initialValue;
        }
      }
    }, [defaultValue, isControlled]);

    // Update content when value changes (controlled mode)
    useEffect(() => {
      if (contentEditableRef.current && isControlled && value !== undefined) {
        if (contentEditableRef.current.textContent !== value) {
          contentEditableRef.current.textContent = value;
        }
      }
    }, [value, isControlled]);

    // Auto focus
    useEffect(() => {
      if (autoFocus && contentEditableRef.current) {
        contentEditableRef.current.focus();
      }
    }, [autoFocus]);

    // Forward ref
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(contentEditableRef.current);
      } else if (ref) {
        ref.current = contentEditableRef.current;
      }
    }, [ref]);

    const textareaElement = (
      <Box
        ref={contentEditableRef}
        contentEditable={!disabled && !readOnly}
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={onFocus}
        onBlur={onBlur}
        className={className}
        minHeight={`${rows * 1.5}em`}
        padding="2"
        border="1px solid"
        borderColor={invalid ? "red.500" : "gray.200"}
        borderRadius="md"
        outline="none"
        _focus={{
          borderColor: invalid ? "red.500" : "blue.500",
          boxShadow: `0 0 0 1px ${invalid ? "red.500" : "blue.500"}`,
        }}
        _disabled={{
          opacity: 0.6,
          cursor: "not-allowed",
          bg: "gray.50",
        }}
        _empty={{
          _before: {
            content: placeholder ? `"${placeholder}"` : undefined,
            color: "gray.400",
            pointerEvents: "none",
          }
        }}
        whiteSpace="pre-wrap"
        overflowWrap="break-word"
        resize="vertical"
        overflow="auto"
        contentEditable
        suppressContentEditableWarning={true}
        {...props}
      />
    );

    // If we have additional field props, wrap in Field component
    if (label || helperText || errorText || required) {
      return (
        <Field.Root invalid={invalid} required={required}>
          {label && (
            <Field.Label>
              {label}
              {required && <Field.RequiredIndicator />}
            </Field.Label>
          )}
          {textareaElement}
          {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
          {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
        </Field.Root>
      );
    }

    return textareaElement;
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
