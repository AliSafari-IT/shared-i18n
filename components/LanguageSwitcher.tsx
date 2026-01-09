import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage.js";
import { LANGUAGE_CONFIGS, LANGUAGE_NAMES, LANGUAGE_EMOJIS, SUPPORTED_LANGUAGES, type SupportedLanguage } from "../config/i18n.js";
import { getLanguageFlag } from "../utils/languageIcons.js";
import styles from "./LanguageSwitcher.module.css";

export interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
  languages?: readonly SupportedLanguage[];
  variant?: "buttons" | "select" | "icon-dropdown";
  disabled?: boolean;
  getLabel?: (lang: SupportedLanguage) => string;
  getIcon?: (lang: SupportedLanguage) => React.ReactNode;
  onChanged?: (lang: SupportedLanguage) => void;
  buttonClassName?: string;
  selectClassName?: string;
  showLabel?: boolean;
  showIcon?: boolean;
  showEmoji?: boolean;
  unstyled?: boolean;
  isToggler?: boolean;
}

export const LanguageSwitcher = ({
  className,
  style,
  languages = SUPPORTED_LANGUAGES,
  variant = "buttons",
  disabled = false,
  getLabel,
  getIcon,
  onChanged,
  buttonClassName,
  selectClassName,
  showLabel = true,
  showIcon = false,
  showEmoji = true,
  unstyled = false,
  isToggler = true,
}: LanguageSwitcherProps) => {
  const { language, changeLanguage, isChanging } = useLanguage();

  const handleChange = async (lang: SupportedLanguage) => {
    await changeLanguage(lang);
    onChanged?.(lang);
  };

  const isDisabled = isChanging || disabled;
  const shouldUseToggler = isToggler && languages.length === 2 && variant === "select";

  const getSelectClassName = () => {
    if (selectClassName) return selectClassName;
    if (unstyled) return className || "";
    return `${styles.switcher} ${className || ""}`.trim();
  };

  const getButtonsClassName = () => {
    if (unstyled) return className || "";
    return `${styles.switcher} ${className || ""}`.trim();
  };

  if (variant === "icon-dropdown") {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const currentLang = languages.find((lang) => lang === language);
    const currentLabel = currentLang ? (getLabel ? getLabel(currentLang) : LANGUAGE_NAMES[currentLang]) : "";
    const currentFlag = currentLang ? getLanguageFlag(currentLang) : "🌐";

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    const handleSelect = async (lang: SupportedLanguage) => {
      await handleChange(lang);
      setIsOpen(false);
    };

    return (
      <div
        ref={dropdownRef}
        className={`${styles.iconDropdownContainer} ${selectClassName || className || ""}`.trim()}
        style={style}
      >
        <button
          className={styles.iconDropdownButton}
          onClick={() => setIsOpen(!isOpen)}
          disabled={isDisabled}
          title={currentLabel}
          aria-label={`Select language: ${currentLabel}`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {currentFlag}
        </button>
        {isOpen && (
          <div className={styles.iconDropdownMenu} role="listbox">
            {languages.map((lang) => (
              <button
                key={lang}
                className={`${styles.iconDropdownOption} ${lang === language ? styles.active : ""}`}
                onClick={() => handleSelect(lang)}
                role="option"
                aria-selected={lang === language}
                title={getLabel ? getLabel(lang) : LANGUAGE_NAMES[lang]}
              >
                {showEmoji ? LANGUAGE_EMOJIS[lang] : (getLabel ? getLabel(lang) : LANGUAGE_NAMES[lang])}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (shouldUseToggler) {
    const otherLang = languages.find((lang) => lang !== language) as SupportedLanguage;
    const currentLangConfig = LANGUAGE_CONFIGS.find(config => config.code === language);
    return (
      <button
        className={`${styles.toggler} ${selectClassName || className || ""}`.trim()}
        style={style}
        onClick={() => handleChange(otherLang)}
        disabled={isDisabled}
        aria-label={`Switch to ${getLabel ? getLabel(otherLang) : LANGUAGE_NAMES[otherLang]}`}
        title={`Switch to ${getLabel ? getLabel(otherLang) : LANGUAGE_NAMES[otherLang]}`}
      >
        {showEmoji ? (currentLangConfig && LANGUAGE_EMOJIS[currentLangConfig.code]) : (getLabel ? getLabel(language) : LANGUAGE_NAMES[language])}
      </button>
    );
  }

  if (variant === "select") {
    return (
      <select
        className={getSelectClassName()}
        style={style}
        value={language}
        onChange={(e) => handleChange(e.target.value as SupportedLanguage)}
        disabled={isDisabled}
      >
        {languages.map((lang) => {
          const displayText = showEmoji ? LANGUAGE_EMOJIS[lang] : (getLabel ? getLabel(lang) : LANGUAGE_NAMES[lang]);
          return (
            <option key={lang} value={lang}>
              {displayText}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <div className={getButtonsClassName()} style={style}>
        {languages.map((lang) => {
          const isActive = lang === language;
          const btnClass = buttonClassName
            ? `${buttonClassName}${isActive ? " active" : ""}`
            : isActive
            ? "active"
            : "";

          const label = getLabel ? getLabel(lang) : LANGUAGE_NAMES[lang];
          const icon = getIcon ? getIcon(lang) : null;

          return (
            <button
              key={lang}
              className={btnClass}
              onClick={() => handleChange(lang)}
              disabled={isDisabled}
              aria-pressed={isActive}
              data-active={isActive}
              aria-label={!showLabel ? label : undefined}
              title={!showLabel ? label : undefined}
            >
              {showIcon && icon}
              {showLabel && label}
            </button>
          );
        })}
      </div>
    );
};
