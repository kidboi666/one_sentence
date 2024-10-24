import Icon from '@/components/shared/Icon'
import LinkButton from '@/components/shared/LinkButton'

export default function HomeLogoSection() {
  return (
    <div className="h-80 w-full md:size-full">
      <LinkButton
        href="/"
        disabled
        variant="none"
        className="relative h-fit w-full"
      >
        <Icon
          name="logo"
          size={400}
          view={200}
          className="text-var-black dark:text-white"
        >
          <g>
            <g>
              <path d="M62.8,7.33v37.45h9.78v4.22h-9.78v95.6h-4.89V7.33h4.89M30.02,7.33v10.21h17.84v3.73H6.63v-3.73h18.34V7.33h5.05M27.62,27.33c10.21,0,17.34,7.1,17.34,17.26s-7.13,17.42-17.34,17.42-17.59-7.16-17.59-17.42,7.23-17.26,17.59-17.26M27.62,58.2c7.31,0,12.62-5.66,12.62-13.45s-5.19-13.62-12.62-13.62-12.79,5.6-12.79,13.62,5.38,13.45,12.79,13.45M63.8,6.33h-6.89v139.28h6.89V50.01h9.78v-6.22h-9.78V6.33h0ZM31.02,6.33h-7.05v10.21H5.63v5.73h43.24v-5.73h-17.84V6.33h0ZM27.62,26.33c-11.12,0-18.59,7.88-18.59,18.26s7.47,18.42,18.59,18.42,18.34-7.8,18.34-18.42-7.3-18.26-18.34-18.26h0ZM27.62,57.2c-6.81,0-11.79-5.06-11.79-12.45s4.98-12.62,11.79-12.62,11.62,4.9,11.62,12.62-4.9,12.45-11.62,12.45h0Z" />
              <path d="M127.33,15.9v18.17h-42.32l-1,1v9.29l1,1h44.23v3.81h-49.95v-18.58h42.24l1-1v-8.8l-1-1h-42.57v-3.89h48.38M137.87,58.64v3.89h-30.37l-1,1v21.66h-4.81v-21.66l-1-1h-31.28v-3.89h68.46M128.33,14.9h-50.38v5.89h43.57v8.8h-43.24v20.58h51.95v-5.81h-45.23v-9.29h43.32V14.9h0ZM138.87,57.64h-70.46v5.89h32.28v22.66h6.81v-22.66h31.37v-5.89h0Z" />
              <path d="M48.95,99.79H6.29v-5.81h18.01v-7.22h7.05v7.22h17.59v5.81ZM9.94,117.64c0-8.63,6.89-14.52,18.18-14.52s18.09,5.89,18.09,14.52-6.89,14.69-18.09,14.69-18.18-5.89-18.18-14.69ZM39.4,117.64c0-5.48-4.23-8.88-11.29-8.88s-11.37,3.4-11.37,8.88,4.23,9.05,11.37,9.05,11.29-3.4,11.29-9.05ZM66.87,159.63H18.57v-20.91h6.97v15.1h41.33v5.81Z" />
              <path d="M143.46,122.87h-36.7v7.39h21.25v17.43h-42.91v17.3h114.24v5.48h-121.29v-28.01h43.07v-6.8h-43.07v-5.39h21.66v-7.39h-31.29v-5.81h75.04v5.81ZM128.91,113.82c-9.46-1.41-20.58-6.47-25.81-13.53-5.56,7.22-16.27,11.7-26.06,13.53l-3.49-5.15c9.96-1.41,22.57-6.06,25.23-14.11h-21.83v-5.64h52.2v5.64h-21.91c2.66,8.05,15.6,12.7,25.4,14.19l-3.73,5.06Z" />
            </g>
            <g>
              <path d="M97.73,153.79c.04.17.07.36.1.59.04.32.05.53.05.62,0,.1-.05.28-.12.54-.1.36-.15.57-.15.65s-.07.25-.2.53c-.13.27-.26.49-.37.66-.13.18-.2.3-.23.36-.03.08-.12.2-.29.38-.18.2-.31.36-.4.48-.14.19-.48.5-1.03.94-.1.08-.2.13-.31.17-.12.05-.23.1-.34.15-.61.29-1.13.12-1.57-.52-.18-.25-.3-.38-.37-.36-.07.01-.25.17-.54.48-.39.41-.76.65-1.09.72-.33.07-.55-.04-.67-.33-.05-.1-.1-.2-.15-.29-.13-.18-.24-.57-.34-1.18-.01-.06-.03-.17-.06-.32-.03-.15-.04-.24-.06-.28-.08-.43-.11-1.01-.09-1.74.02-.73.08-1.18.18-1.36.1-.18.21-.24.32-.18.12.06.15.19.1.39-.05.14-.06.48-.04,1.01.01.61.08,1.27.21,1.97.01.06.03.18.06.34.03.17.04.28.06.34.04.18.1.36.18.54.08.18.16.29.22.32.1.06.23.04.38-.09.15-.12.48-.44.99-.96.01-.01.03-.03.06-.06.1-.1.16-.21.17-.32.01-.12.01-.47,0-1.07v-.44c-.03-.64-.01-1,.04-1.09.04-.08.07-.23.1-.46.09-.56.27-.91.55-1.05.23-.1.38.02.44.36.01.09.02.19.02.31-.01.25.01.44.08.55.06.14.09.5.09,1.09s-.05.92-.12.99c-.13.14-.22.39-.27.75s-.04.62.04.8c.23.55.71.62,1.43.21.73-.42,1.36-1.1,1.89-2.04.22-.38.38-.77.5-1.17.22-.76.31-1.37.27-1.81-.03-.25-.03-.4,0-.42.1-.18.2-.08.31.29Z" />
              <path d="M106.6,153.43s.07.05.07.12-.04.15-.12.23-.18.15-.3.2c-.51.18-1.03.33-1.57.44-.36.08-.8.29-1.32.65-.38.26-.7.57-.96.95-.26.38-.43.77-.51,1.19-.06.32-.1.51-.11.57-.04.17-.04.53-.02,1.11.01.47,0,.79-.05.96-.04.17-.14.27-.28.32-.14.05-.24,0-.29-.15-.04-.13-.09-.52-.15-1.18-.05-.62-.11-.98-.17-1.07-.03-.05-.12-.52-.27-1.39-.13-.69-.19-1.1-.19-1.23s.07-.24.21-.32c.12-.06.2-.05.25.03.05.08.12.32.21.72.14.65.26.97.36.97.04,0,.09-.06.15-.17.41-.82,1.18-1.59,2.33-2.31.22-.13.58-.26,1.1-.4.52-.14.96-.22,1.35-.25.14,0,.23,0,.28.02Z" />
              <path d="M108.73,150.38c.08.07.13.25.15.54.04.25.08.46.13.61.13.34.15.67.07.98-.08.31-.24.47-.47.47-.08,0-.13-.04-.16-.13-.03-.09-.05-.28-.07-.57-.03-.37-.06-.6-.12-.71-.08-.18-.1-.39-.07-.64.03-.25.1-.42.2-.51.14-.1.25-.12.33-.05ZM108.73,155.36c.09.06.13.22.13.48.03.79.09,1.38.19,1.76.05.24.08.66.08,1.26,0,.48-.01.8-.04.94-.03.14-.1.25-.23.33-.29.19-.46.02-.52-.52-.01-.13-.01-.28,0-.46,0-.45-.02-.79-.06-1.03-.04-.24-.06-.71-.08-1.41-.01-.51-.01-.81,0-.92.01-.1.06-.2.15-.29.15-.15.27-.2.36-.13Z" />
              <path d="M116.26,150.3s.06-.02.1-.02c.06-.04.12-.03.16.02.04.05.07.12.07.2s-.02.16-.06.24c-.14.22-.28.9-.42,2.04-.04.31-.07.5-.1.57-.05.11-.09.26-.12.44-.03.18-.04.28-.03.31.04.06.46.06,1.28,0,.55-.04.85,0,.92.09.05.1.03.2-.08.29s-.27.17-.51.23c-.24.06-.51.11-.81.13-.41.03-.66.07-.75.12s-.17.24-.23.54c-.14.61-.21,1.26-.21,1.94s.07,1.15.21,1.4c.38.69.86.87,1.43.55.2-.12.39-.22.55-.31.14-.08.36-.22.67-.42.37-.23.58-.32.63-.27.05.05-.07.24-.36.55-.43.48-.89.84-1.36,1.07-.17.09-.41.14-.74.15-.32.01-.55-.02-.68-.1-.15-.08-.33-.25-.54-.51-.2-.26-.35-.5-.44-.72-.04-.13-.06-.52-.08-1.17-.01-.65,0-1.11.04-1.39.03-.23.05-.48.08-.76l.02-.33-.31.04c-.2.03-.44.08-.71.17-.09.03-.24.08-.45.15-.21.08-.34.13-.39.15-.66.22-.99.18-.97-.11,0-.05.01-.1.04-.15.04-.11.24-.26.61-.45s.64-.28.82-.28c.09,0,.34-.05.75-.14s.65-.16.7-.18c.03-.01.07-.17.13-.48.05-.32.12-.59.19-.8.08-.25.13-.6.17-1.03.1-1.1.33-1.69.67-1.8.03,0,.05,0,.08-.02Z" />
              <path d="M122.47,150.38c.08.07.13.25.15.54.04.25.08.46.13.61.13.34.15.67.07.98-.08.31-.24.47-.47.47-.08,0-.13-.04-.16-.13-.03-.09-.05-.28-.07-.57-.03-.37-.06-.6-.12-.71-.08-.18-.1-.39-.07-.64.03-.25.1-.42.2-.51.14-.1.25-.12.33-.05ZM122.47,155.36c.09.06.13.22.13.48.03.79.09,1.38.19,1.76.05.24.08.66.08,1.26,0,.48-.01.8-.04.94-.03.14-.1.25-.23.33-.29.19-.46.02-.52-.52-.01-.13-.01-.28,0-.46,0-.45-.02-.79-.06-1.03-.04-.24-.06-.71-.08-1.41-.01-.51-.01-.81,0-.92.01-.1.06-.2.15-.29.15-.15.27-.2.36-.13Z" />
              <path d="M126.44,153.46c.17.13.27.3.33.51.05.19.13.4.24.64.11.24.18.36.22.37.05.01.11-.04.17-.15.24-.38.5-.67.78-.86.65-.41,1.05-.61,1.2-.61s.31.08.47.25c.16.17.25.34.28.54.06.38.14.7.23.96.05.15.1.34.15.57.03.2.06.36.1.46.03.11.07.47.14,1.08.07.61.11.97.11,1.1,0,.38.06.69.17.94.08.14.1.29.08.44-.03.15-.09.27-.19.36-.15.15-.29.19-.4.12-.11-.08-.18-.25-.21-.54-.03-.23-.06-.44-.1-.63-.04-.22-.07-.52-.09-.9-.03-.41-.06-.67-.1-.78-.04-.13-.06-.33-.06-.61s-.03-.52-.08-.73c-.04-.18-.08-.38-.12-.61-.04-.2-.13-.54-.27-1.01-.08-.28-.34-.3-.78-.06-.46.25-.77.61-.94,1.05-.13.31-.2.54-.23.7-.03.16-.04.51-.04,1.04,0,.62-.03,1.02-.09,1.18-.06.17-.18.25-.37.25-.11,0-.19-.06-.23-.17-.04-.11-.06-.38-.06-.78,0-.84-.08-1.65-.23-2.44-.15-.78-.31-1.17-.48-1.17-.13,0-.2-.09-.23-.27-.03-.18.03-.29.15-.34.14-.05.29,0,.46.12Z" />
              <path d="M136.09,153.43c.29.09.52.31.69.65l.15.33.13-.13c.09-.09.16-.14.22-.14.06,0,.12.04.2.12.08.08.12.35.12.81s-.03.86-.1,1.17c-.05.19-.08.77-.08,1.73s.03,1.53.08,1.69c.03.1.1.14.21.12.11-.02.43-.12.94-.32.78-.29,1.41-.48,1.91-.55.27-.04.48-.08.65-.11.13-.04.26-.05.39-.05.13,0,.21.03.22.07,0,.04-.09.1-.28.19s-.33.14-.45.15c-.13.03-.39.12-.8.29-.43.19-.79.33-1.07.42-.29.09-.61.21-.95.37-.34.16-.54.28-.6.35-.06.06-.1.32-.1.76,0,.47-.03.83-.08,1.09-.05.27-.08.46-.08.57,0,.29-.1.62-.29.99-.19.37-.41.65-.65.84-.37.27-.61.4-.71.4-.09,0-.18.02-.29.06-.23.08-.55.06-.97-.06-.42-.11-.71-.27-.86-.46-.31-.34-.35-.8-.12-1.37.22-.57.64-1.11,1.25-1.61.48-.4.99-.78,1.53-1.15.24-.17.38-.3.41-.4.03-.1.04-.41.03-.94-.01-.56-.02-1.13-.02-1.7,0-.5-.03-.76-.09-.78-.06-.03-.26.1-.6.38-.78.66-1.41.95-1.91.86-.5-.09-.78-.54-.84-1.34-.04-.69.18-1.39.67-2.11.48-.72,1.02-1.12,1.61-1.21.22-.04.39-.04.52,0ZM136.68,161.17s-.15.06-.33.21c-.14.13-.31.25-.52.38-.36.2-.75.57-1.19,1.1s-.66.9-.66,1.12c0,.31.14.53.43.67.29.14.61.17.97.09s.65-.26.85-.53c.22-.29.35-.56.41-.79.06-.24.09-.64.11-1.21.03-.67,0-1.02-.08-1.03ZM135.23,154.31c-.42.32-.76.76-1.01,1.32-.09.22-.13.52-.13.92s.04.62.13.69c.08.05.22.05.42,0s.38-.12.52-.22c.43-.32.8-.63,1.1-.95.3-.31.47-.55.51-.72,0-.03,0-.08.03-.15.02-.08.04-.14.05-.19.04-.2.04-.31.02-.31-.01-.01-.06.03-.15.13-.24.28-.43.37-.57.27-.11-.08-.11-.22,0-.44.12-.22.12-.38.02-.5-.19-.23-.5-.18-.92.13Z" />
              <path d="M150.21,150.13c.17.38.24,1.49.21,3.32-.01,1.31.03,1.97.13,1.97.05.01.13-.11.25-.36.23-.43.52-.81.86-1.13.34-.32.7-.52,1.07-.61.39-.1.72.09.96.56.25.48.28.98.11,1.52-.1.33-.36.87-.78,1.62-.13.23-.29.45-.49.67-.2.22-.37.36-.51.44-.14.06-.36.24-.65.52-.32.29-.57.51-.75.65-.18.14-.32.3-.42.48-.06.12-.14.21-.24.3s-.18.12-.25.12-.12-.03-.16-.1c-.01-.04-.08-.08-.19-.13-.12-.05-.18-.1-.18-.13,0-.04.04-.1.12-.17.17-.13.27-.47.32-1.02.04-.55.08-1.95.1-4.19,0-1.72,0-2.76,0-3.13,0-.37-.04-.69-.09-.96-.06-.39-.08-.79-.04-1.17.04-.39.12-.61.25-.65.13-.04.22,0,.27.16.05.15.07.39.06.73-.01.36,0,.59.04.71ZM152.24,154.25c-.43.27-.8.7-1.09,1.3s-.47,1.25-.54,1.97c-.03.23-.06.4-.11.52-.11.29-.11.5,0,.63.04.04.08.04.11,0,.17-.08.52-.4,1.06-.98.54-.58.81-.91.81-1,0-.03.04-.1.13-.23.1-.11.18-.24.23-.36l.15-.29c.05-.09.08-.16.08-.21s.01-.08.04-.1c.09-.06.13-.29.12-.67,0-.38-.06-.62-.16-.73-.14-.17-.42-.12-.84.15Z" />
              <path d="M160.99,153.28c.05-.01.09.02.12.09.03.07.05.18.06.32,0,.14,0,.34,0,.61-.01.41,0,.99.04,1.75.04.76.08,1.29.11,1.6.03.2.04.44.06.71,0,.22.02.39.06.54.1.27.14.54.12.81-.02.27-.09.44-.22.49-.18.06-.32-.02-.41-.24s-.17-.67-.24-1.33c-.05-.41-.09-.67-.12-.78-.03-.13-.04-.47-.04-1.03,0-.61-.04-.92-.13-.92-.05,0-.17.14-.34.42-.41.65-.8,1.1-1.17,1.35-.38.25-.84.37-1.39.37-.18,0-.36-.13-.53-.38-.18-.25-.3-.55-.36-.9-.03-.13-.06-.24-.11-.33-.06-.1-.1-.39-.12-.86-.01-.47.01-.75.08-.82.06-.08.1-.16.1-.25,0-.08.03-.14.08-.19.05-.05.1-.06.15-.04.05.01.08.1.08.27s.03.34.1.54c.06.18.1.38.1.61.01.43.09.82.22,1.17.13.34.29.53.47.55.17.04.41-.04.75-.22s.55-.37.67-.54c.1-.15.2-.29.29-.4.12-.13.3-.45.55-.97s.39-.85.42-.97c.04-.19.06-.31.08-.34.01-.06.04-.17.08-.31.01-.09.07-.17.17-.23.11-.06.2-.1.25-.12Z" />
              <path d="M170.42,148.38c.11.03.17.16.17.39,0,.11.02.22.06.31.06.08.09.25.08.53-.01.27-.04.42-.1.43-.05.01-.11-.05-.17-.19-.2-.43-.4-.24-.59.57-.03.1-.05.22-.08.36-.04.19-.06.95-.06,2.27,0,1.06.02,1.74.05,2.03.03.3.12.65.28,1.04.05.1.09.23.11.38.05.37.18.82.4,1.36.2.5.27.78.21.86-.09.1-.21.06-.36-.13-.1-.11-.18-.23-.24-.34-.06-.11-.2-.43-.43-.96-.09-.22-.16-.33-.22-.33s-.13.06-.21.18c-.08.12-.14.25-.16.37-.06.23-.27.56-.63.98s-.66.7-.9.83c-.05.03-.14.1-.27.21-.29.25-.68.44-1.17.56-.48.12-.87.12-1.17,0-.51-.19-.82-.52-.95-.98s-.04-1,.26-1.6c.08-.18.12-.29.12-.32,0-.12.16-.35.48-.7.32-.35.6-.61.84-.77.34-.23.66-.37.96-.41.29-.04.63,0,1.01.1.52.17.73.45.63.84-.04.14-.1.24-.2.3-.1.06-.18.06-.26,0-.08-.05-.12-.15-.12-.29,0-.18-.09-.31-.28-.38-.19-.08-.41-.08-.68,0-.61.19-1.16.66-1.63,1.4s-.6,1.32-.35,1.71c.22.34.57.48,1.07.41s1.03-.34,1.59-.81c.65-.52,1.24-1.27,1.76-2.24.09-.14.08-.38-.04-.71-.1-.32-.18-1.05-.23-2.21-.05-1.15-.04-1.86.04-2.13.04-.14.06-.36.08-.65.03-.41.13-.81.33-1.22.1-.23.17-.38.19-.44.08-.15.19-.31.34-.46.18-.17.32-.23.44-.2Z" />
              <path d="M179.69,148.38c.11.03.17.16.17.39,0,.11.02.22.06.31.06.08.09.25.08.53-.01.27-.04.42-.1.43-.05.01-.11-.05-.17-.19-.2-.43-.4-.24-.59.57-.03.1-.05.22-.08.36-.04.19-.06.95-.06,2.27,0,1.06.02,1.74.05,2.03.03.3.12.65.28,1.04.05.1.09.23.11.38.05.37.18.82.4,1.36.2.5.27.78.21.86-.09.1-.21.06-.36-.13-.1-.11-.18-.23-.24-.34-.06-.11-.2-.43-.43-.96-.09-.22-.16-.33-.22-.33s-.13.06-.21.18c-.08.12-.14.25-.16.37-.06.23-.27.56-.63.98s-.66.7-.9.83c-.05.03-.14.1-.27.21-.29.25-.68.44-1.17.56-.48.12-.87.12-1.17,0-.51-.19-.82-.52-.95-.98s-.04-1,.26-1.6c.08-.18.12-.29.12-.32,0-.12.16-.35.48-.7.32-.35.6-.61.84-.77.34-.23.66-.37.96-.41.29-.04.63,0,1.01.1.52.17.73.45.63.84-.04.14-.1.24-.2.3-.1.06-.18.06-.26,0-.08-.05-.12-.15-.12-.29,0-.18-.09-.31-.28-.38-.19-.08-.41-.08-.68,0-.61.19-1.16.66-1.63,1.4s-.6,1.32-.35,1.71c.22.34.57.48,1.07.41s1.03-.34,1.59-.81c.65-.52,1.24-1.27,1.76-2.24.09-.14.08-.38-.04-.71-.1-.32-.18-1.05-.23-2.21-.05-1.15-.04-1.86.04-2.13.04-.14.06-.36.08-.65.03-.41.13-.81.33-1.22.1-.23.17-.38.19-.44.08-.15.19-.31.34-.46.18-.17.32-.23.44-.2Z" />
              <path d="M183.4,153.47c.09.11.09.28,0,.5-.09.2-.14.65-.14,1.33,0,.68.03,1.17.11,1.46s.2.54.34.74c.15.2.29.3.43.3.37,0,.94-.38,1.72-1.13.32-.31.51-.51.56-.6.06-.1.1-.26.12-.49.03-.22.07-.44.13-.67.01-.06.04-.18.09-.35.04-.17.07-.28.09-.33.06-.24.14-.43.23-.55.09-.13.18-.19.27-.19s.18.06.29.19c.1.15.13.49.09,1-.04.52-.12.84-.24.98-.04.05-.1.18-.17.38-.08.2-.11.33-.11.38,0,.06-.03.17-.08.33-.06.22-.15.9-.25,2.04-.01.08-.03.18-.04.31-.04.39-.03.61.04.66s.31,0,.75-.14c.14-.04.25-.07.33-.1.2-.06.5-.13.9-.21.33-.08.57-.13.73-.17.19-.08.71-.19,1.57-.34.19-.03.39-.04.59-.06.28-.03.51-.05.69-.08.33-.05.5-.03.5.08,0,.09-.4.23-1.18.42-.33.08-.54.13-.63.15-.09.03-.28.08-.57.15-.67.14-1.08.25-1.22.32-.08.04-.22.08-.44.13-.48.1-1.03.27-1.64.52-.41.15-.62.27-.65.36,0,.01,0,.05-.03.12-.02.07-.04.15-.08.25-.03.1-.06.18-.09.26-.1.32-.19.62-.27.9-.09.25-.16.41-.22.48-.06.06-.09.12-.09.17,0,.15-.24.54-.73,1.17s-.8.96-.96,1.01c-.18.06-.36-.04-.54-.31s-.32-.61-.41-1.02c-.09-.41-.1-.78-.04-1.1.06-.23.1-.39.1-.48,0-.18.11-.4.33-.68.22-.27.46-.48.72-.62.12-.05.22-.12.33-.21.18-.13.57-.3,1.17-.52.18-.05.29-.13.33-.24s.06-.36.06-.75c0-.47.03-.84.08-1.11.09-.45.08-.67-.02-.67-.13,0-.27.08-.42.25-.06.08-.21.19-.44.34-.54.34-.99.5-1.37.47-.38-.03-.7-.26-.98-.68-.28-.43-.42-1.23-.42-2.38s.14-1.81.42-1.98c.18-.11.31-.11.4,0ZM185.21,161.15c-.27.11-.54.29-.83.54-.29.24-.49.47-.6.69-.09.2-.14.52-.14.95,0,.43.04.71.12.85.15.23.31.23.48,0,.04-.05.18-.24.42-.57.18-.25.32-.48.42-.67.1-.19.17-.31.21-.36.05-.05.17-.38.36-.97.09-.24.11-.39.08-.46-.08-.1-.25-.09-.52.02Z" />
            </g>
          </g>
          <g>
            <path d="M72.59,100.07v4.27h-9.41v-4.27h9.41M73.59,99.07h-10.76v6.27h10.76v-6.27h0Z" />
          </g>
        </Icon>
      </LinkButton>
    </div>
  )
}
