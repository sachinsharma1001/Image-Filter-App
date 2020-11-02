import { Request, Response, Router } from "express"
import { deleteLocalFiles, filterImageFromURL } from "../util/util";


const router: Router = Router();

router.get("/filteredimage", async (req: Request, res: Response) => {
    let image_url = req.query.image_url;

    if(!image_url) {
        return res.status(400).send({message: "Invalid url. Please provide correct url"});
    }

    let filteredImagePath: string;
    try {
        filteredImagePath = await filterImageFromURL(image_url);
    } catch(error) {
        return res.status(422).send({message: "Error in filtering image"});
    }

    res.download(filteredImagePath, async (error) => {
        if (error) {
          res.status(204).end();
        }
    
        try {
          await deleteLocalFiles([filteredImagePath]);
        } catch (err) {
          console.log(err);
        }
      });
});

export const IndexRouter: Router = router;