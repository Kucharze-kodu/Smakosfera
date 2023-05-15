import { styles } from "../style";

const Recipes = () => {
  return (
    <>
      {/* Searchbar */}
      <div className={`${styles.paragraph} p-2 border-b-[1px]`}>
        <form>
          <div className={`relative`}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              name="search"
              className="rounded-lg w-full pr-[5.3rem] pl-10 p-2 border-[1px] border-dimWhite hover:border-white"
              placeholder="Wyszukaj przepis..."
            />
            <button
              type="submit"
              className="hover:text-white absolute right-3 top-2 ring-0 border-0 hover:border-0 focus:border-0 outline-none hover:outline-none focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Recipes section */}
      <div className={`${styles.paragraph} p-2 `}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        tincidunt, lorem sit amet pulvinar vehicula, risus libero aliquet nisi,
        in finibus arcu sapien non mi. Etiamonsequat tempus dui,Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Pellentesque tincidunt,
        lorem sit amet pulvinar vehicula, risus libero aliquet nisi, in finibus
        arcu sapien non mi. Etiam consequat tempus dui, viverra rhoncus dui
        ornare id. Al consequat tempus dui,Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Pellentesque tincidunt, lorem sit amet
        pulvinar vehicula, risus libero aliquet nisi, in finibus arcu sapien non
        mi. Etiam consequat tempus dui, viverra rhoncus dui ornare id. Aliquam
        ut fringilla justo. Aenean lobortis urna eget sapien fringilla dapibus.
        Integer non velit vel magna imperdiet posuere a vitae mi. Morbi pharetra
        auctor auctor. Proin ligula lorem, eleifend quis vehicula vitae, pretium
        ac libero. Phasellus at dui orci. Sed sollicitudin aliquet rhoncus. Sed
        sed ultrices diam, id feugiat nisl. Suspendisse tempor orci viverra
        dolor tempor, ut ornare purus eleifend. Vestibulum cursus ornare magna,
        eu lobortis felis imperdiet in. Curabitur finibus ornare volutpat.
        Quisque pharetra bibendum ex, quis convallis purus sollicitudin eget.
        Etiam condimentum libero quis nunc dignissim vestibulum. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Maecenas lectus dui, consequat nec lacus sed, maximus fermentum
        arcu. Vestibulum id pharetra massa. Sed eros nunc, aliquet et dignissim
        varius, molestie vel lacus. viverra rhoncus dui ornare id. Aliquam ut
        fringilla justo. Aenean lobortis urna eget sapien fringilla dapibus.
        Integer non velit vel magna imperdiet posuere a vitae mi. Morbi pharetra
        auctor auctor. Proin ligula lorem, eleifend quis vehicula vitae, pretium
        ac libero. Phasellus at dui orci. Sed sollicitudin aliquet rhoncus. Sed
        sed ultrices diam, id feugiat nisl. Suspendisse tempor orci viverra
        dolor tempor, ut ornare purus eleifend. Vestibulum cursus ornare magna,
        eu lobortis felis imperdiet in. Curabitur finibus ornare volutpat.
        Quisque pharetra bibendum ex, quis convallis purus sollicitudin eget.
        Etiam condimentum libero quis nunc dignissim vestibulum. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Maecenas lectus dui, consequat nec lacus sed, maximus fermentum
        arcu. Vestibulum id pharetra massa. Sed eros nunc, aliquet et dignissim
        varius, molestie vel lacus.
      </div>
    </>
  );
};

export default Recipes;
